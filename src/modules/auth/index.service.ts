import {JwtService} from '@nestjs/jwt';
import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {RedisClient} from '@hom-module/auth/types';
import {Strategy} from '@hom-graphql/models';
import {AuthTokenResponse} from '@hom-module/auth/responses';
import {Customer} from '@hom-graphql/models';

import {StrategyType} from './types/stategy.type';
import {User} from './types/user.type';
import {
  FacebookProfile,
  GoogleProfile,
  HOMFacebookProfile,
  HOMGoogleProfile,
  HOMTwitterProfile,
  Profile,
  TwitterProfile,
} from './types/profile.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @Inject(CACHE_MANAGER) private cacheManager: RedisClient,
    private readonly jwt: JwtService,
  ) {
    //
  }

  /**
   * @method do
   * Provides initial login for a customer; this is invoked through OAuth by our defined strategies
   * such as Facebook, Google and Twitter.  Once we are successfully authenticated with these sources we check
   * to see if the given user exists already in our system.  If they don't we create a new document so
   * we can track
   * @param strategy
   * @param profile
   */
  async do(strategy: StrategyType, profile: Profile) {
    const customer = this.getCustomer(strategy, profile);
    if (customer) {
      const {email, type, id} = customer;
      let existingCustomer = await this.customerModel.findOne({email}).exec();
      if (!existingCustomer) {
        const customerModel = new this.customerModel();
        const customerData: Partial<Customer> = {
          ...customer,
          strategies: [
            {
              id,
              type,
              isActivelySignedIn: false,
            },
          ],
        };
        const token = await this.signAndReturnToken(id, type);
        const strategy = customerData?.strategies?.[0];
        Object.assign(customerModel, {
          ...customerData,
          strategies: {
            ...strategy,
            token,
          },
        });
        await customerModel.save();
        return this.signAndReturnToken(id, type);
      }

      existingCustomer = await this.clearOldTokens(existingCustomer);

      const foundStrategy = existingCustomer.strategies.find(
        (existingStrategy) => existingStrategy.type === type,
      );
      const isActivelySignedIn = true;
      const token = await this.signAndReturnToken(id, type);

      if (!foundStrategy) {
        const strategy: Strategy = {id, type, isActivelySignedIn, token};
        const strategies: Strategy[] = [...(existingCustomer?.strategies || []), strategy];
        existingCustomer.strategies = strategies;
        await existingCustomer.updateOne({
          $set: {
            strategies,
          },
        });
      } else {
        await existingCustomer.updateOne({
          $set: {
            strategies: existingCustomer?.strategies?.map((strategy) => ({
              ...strategy,
              ...(strategy.id === foundStrategy.id && {
                isActivelySignedIn,
                token,
              }),
            })),
          },
        });
      }

      return token;
    }
  }

  async signAndReturnToken(id: string, type: string) {
    const createdAt = new Date().toLocaleString();
    const key = `${id}:${type}`;
    const token = await this.getAndSignToken({key, createdAt});

    await this.setToken(key, token);

    return token;
  }

  /**
   * @method clearOldTokens
   * Clear any old tokens from strategies a user has; this is just in-case
   * they try logging in with a different strategy
   * @param customer
   */
  async clearOldTokens(customer: Customer) {
    for (const strategy of customer.strategies) {
      const {id, type} = strategy;
      const key = `${id}:${type}`;
      if (key) {
        await this.cacheManager.delAsync(key);
      }
    }
    return this.customerModel
      .updateOne(
        {
          _id: customer._id.toString(),
        },
        {
          $set: {
            strategies: customer.strategies.map((strategy): Strategy => {
              const {id, type} = strategy;
              return {
                id,
                type,
              };
            }),
          },
        },
      )
      .exec()
      .then(() => this.customerModel.findOne({_id: customer._id.toString()}).exec());
  }

  async getAndSignToken(data) {
    return this.jwt.sign(data, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6hr',
    });
  }

  async setToken(key: string, token: string) {
    const duration = 60 * 60 * 6;
    await this.cacheManager.setAsync(key, token, 'EX', duration);
  }

  /**
   * @method getUser
   * @param strategy
   * @param profile
   */
  getCustomer(strategy: StrategyType, profile: Profile) {
    switch (strategy) {
      case StrategyType.Facebook:
        return this.#normalizeFB(profile as FacebookProfile);
      case StrategyType.Google:
        return this.#normalizeGoogle(profile as GoogleProfile);
      case StrategyType.Twitter:
        return this.#normalizeTwitter(profile as TwitterProfile);
    }
  }

  /**
   * normalizeTwitter
   * Normalize Twitter user object into storable user model
   * @param user
   * @private
   */
  #normalizeTwitter(user: HOMTwitterProfile): User {
    const {name, id, emails, accessToken} = user;
    return {
      id,
      firstName: name?.givenName,
      lastName: name?.familyName,
      email: emails?.[0].value || null,
      accessToken,
      type: StrategyType.Twitter,
    };
  }

  /**
   * normalizeFB
   * Normalize FB user object into storable user model
   * @param user
   * @private
   */
  #normalizeFB(user: HOMFacebookProfile): User {
    const {name, id, emails, accessToken} = user;
    return {
      id,
      firstName: name?.givenName,
      lastName: name?.familyName,
      email: emails?.[0].value || null,
      accessToken,
      type: StrategyType.Facebook,
    };
  }

  /**
   * @method normalizeGoogle
   * Normalize Google user object into storable user model
   * @param user
   * @private
   */
  #normalizeGoogle(user: HOMGoogleProfile): User {
    const {name, id, emails, accessToken} = user;
    return {
      id,
      firstName: name?.givenName,
      lastName: name?.familyName,
      email: emails?.[0].value || null,
      accessToken,
      type: StrategyType.Google,
    };
  }

  /**
   * @method isValidToken
   * Grab the active strategy by matching our current token; this token may or may not be
   * expired, we use this to then validate against redis.  If the current cached token matches
   * redis and hasn't passed it's TTL then it's still valid.
   * @param token
   */
  async isValidToken(token: string): Promise<AuthTokenResponse> {
    const customer: Customer = await this.customerModel
      .findOne({
        'strategies.token': token,
      })
      .lean()
      .exec();
    let isValid = false;
    if (customer) {
      const strategy = customer.strategies.find((thisStrategy) => thisStrategy.token === token);
      if (strategy) {
        const key = `${strategy.id}:${strategy.type}`;
        const cacheToken = await this.cacheManager.getAsync(key);
        if (cacheToken === token) {
          isValid = true;
        }
      }
    }
    return {isValid};
  }
}
