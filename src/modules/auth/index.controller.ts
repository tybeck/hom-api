import {AuthGuard} from '@nestjs/passport';
import {Controller, Get, Res, UseGuards} from '@nestjs/common';
import Express from 'express';

import {User} from './decorators/user.decorator';
import {StrategyType} from './types/stategy.type';
import {AuthService} from './index.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // Google
  @Get(StrategyType.Google)
  @UseGuards(AuthGuard(StrategyType.Google))
  async googleAuth() {
    //
  }

  @Get(`${StrategyType.Google}/redirect`)
  @UseGuards(AuthGuard(StrategyType.Google))
  googleAuthRedirect(@User() user, @Res({passthrough: true}) res: Express.Response) {
    return this.auth.do(StrategyType.Google, user).then(this.redirect(res));
  }

  // FB
  @Get(StrategyType.Facebook)
  @UseGuards(AuthGuard(StrategyType.Facebook))
  async fbAuth() {
    //
  }

  @Get(`${StrategyType.Facebook}/redirect`)
  @UseGuards(AuthGuard(StrategyType.Facebook))
  fbAuthRedirect(@User() user, @Res({passthrough: true}) res: Express.Response) {
    return this.auth.do(StrategyType.Facebook, user).then(this.redirect(res));
  }

  // Twitter
  @Get(StrategyType.Twitter)
  @UseGuards(AuthGuard(StrategyType.Twitter))
  async twitterAuth() {
    //
  }

  @Get(`${StrategyType.Twitter}/redirect`)
  @UseGuards(AuthGuard(StrategyType.Twitter))
  twitterAuthRedirect(@User() user, @Res({passthrough: true}) res: Express.Response) {
    return this.auth.do(StrategyType.Twitter, user).then(this.redirect(res));
  }

  redirect = (res: Express.Response) => {
    return (token: string) => {
      console.log('this is a test.');
      const params = new URLSearchParams([['token', token]]);
      const url = new URL(process.env.URL);

      url.search = params.toString();

      console.log(url.toString());

      return res.redirect(url.toString());
    };
  };
}
