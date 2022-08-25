import {Controller, forwardRef, Get, Inject, UseGuards} from '@nestjs/common';

import {HomAuthGuard} from '@hom-module/auth/guard';

import {SettingService} from './index.service';

@Controller('settings')
export class SettingController {
  constructor(@Inject(forwardRef(() => SettingService)) private settings: SettingService) {}

  @UseGuards(HomAuthGuard)
  @Get('/')
  getSettings() {
    return this.settings.getSettings();
  }
}
