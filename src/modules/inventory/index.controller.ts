import {Controller, Get, UseGuards} from '@nestjs/common';

import {HomAuthGuard} from '@hom-module/auth/guard';

@Controller('inventory')
export class InventoryController {
  @UseGuards(HomAuthGuard)
  @Get('/')
  getInventory() {
    return Promise.resolve([]);
  }
}
