import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Profile, Strategy} from 'passport-facebook';

import {StrategyType} from '@hom-module/auth/types';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, StrategyType.Facebook) {
  constructor() {
    super({
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/${StrategyType.Facebook}/redirect`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    done(null, {...profile, accessToken});
  }
}
