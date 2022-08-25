import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {SettingResolver} from '@hom-graphql/resolvers';
import {Setting, SettingSchema} from '@hom-graphql/models';

import {SettingService} from './index.service';

@Module({
  providers: [SettingService, SettingResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Setting.name,
        schema: SettingSchema,
        collection: Setting.name.toLowerCase(),
      },
    ]),
  ],
  exports: [SettingService],
})
export class SettingModule {}
