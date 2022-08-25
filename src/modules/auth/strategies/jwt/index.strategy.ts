import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';

import {StrategyType} from '@hom-module/auth/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.Hom) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {userId: payload.sub, username: payload.username};
  }
}
