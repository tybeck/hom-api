import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, Profile} from 'passport-twitter';

import {StrategyType} from '@hom-module/auth/types';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, StrategyType.Twitter) {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/${StrategyType.Twitter}/redirect`,
      includeEmail: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done): Promise<any> {
    done(null, {...profile, accessToken});
  }
}
