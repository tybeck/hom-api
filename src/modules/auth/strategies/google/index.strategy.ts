import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback, Profile} from 'passport-google-oauth20';

import {StrategyType} from '@hom-module/auth/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, StrategyType.Google) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/${StrategyType.Google}/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, {...profile, accessToken});
  }
}
