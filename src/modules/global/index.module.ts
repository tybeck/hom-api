import {Module, Global, CacheModule, CACHE_MANAGER} from '@nestjs/common';
import * as store from 'cache-manager-redis-store';
import {ConfigModule} from '@nestjs/config';
import {BullModule} from '@nestjs/bull';
import {JwtService} from '@nestjs/jwt';

import {createRedisFactory} from '@hom-module/auth/utils';

@Global()
@Module({
  providers: [
    JwtService,
    {
      provide: CACHE_MANAGER,
      useFactory: createRedisFactory(),
    },
  ],
  exports: [JwtService, CACHE_MANAGER],
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    CacheModule.register({
      store,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
  ],
})
export class GlobalModule {
  //
}
