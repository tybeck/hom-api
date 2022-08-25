import {Query, Resolver, Args} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';

import {AuthTokenResponse} from '@hom-module/auth/responses';
import {AuthService} from '@hom-module/auth-service';

@Resolver(() => AuthTokenResponse)
export class AuthResolver {
  constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService) {}

  @Query(() => AuthTokenResponse)
  async isValidToken(@Args('token') token: string): Promise<AuthTokenResponse> {
    return this.auth.isValidToken(token);
  }
}
