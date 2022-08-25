import {Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';

import {ISetting, Setting} from '@hom-graphql/models';
import {SettingService} from '@hom-module/settings-service';

@Resolver(() => Setting)
export class SettingResolver {
  constructor(@Inject(forwardRef(() => SettingService)) private settings: SettingService) {}

  @Query(() => [Setting])
  async getSettings(): Promise<Pick<ISetting[], keyof Array<ISetting>>> {
    return this.settings.getSettings();
  }
}
