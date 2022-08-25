import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule, JwtService} from '@nestjs/jwt';

import {Customer, CustomerSchema} from '@hom-graphql/models';
import {AuthResolver} from '@hom-graphql/resolvers';

import {GoogleStrategy} from './strategies/google/index.strategy';
import {FacebookStrategy} from './strategies/fb/index.strategy';
import {TwitterStrategy} from './strategies/twitter/index.strategy';
import {JwtStrategy} from './strategies/jwt/index.strategy';

import {AuthService} from './index.service';
import {AuthController} from './index.controller';

@Module({
  controllers: [AuthController],
  providers: [
    // resolvers
    AuthResolver,
    // strategies
    GoogleStrategy,
    FacebookStrategy,
    TwitterStrategy,
    JwtStrategy,
    // services
    AuthService,
    JwtService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
        collection: Customer.name.toLowerCase(),
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6hr',
      },
    }),
  ],
  exports: [JwtService],
})
export class AuthModule {}
