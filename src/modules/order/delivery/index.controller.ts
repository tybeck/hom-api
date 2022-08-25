import { Controller, forwardRef, Get, Inject, UseGuards } from '@nestjs/common'

import {HomAuthGuard} from '@hom-module/auth/guard';

import {DeliveryService} from './index.service';

@Controller('order/delivery')
export class DeliveryController {
  constructor(@Inject(forwardRef(() => DeliveryService)) private delivery: DeliveryService) {
    //
  }

  @UseGuards(HomAuthGuard)
  @Get('/quote')
  getDeliveryQuote() {
    return this.delivery.getDeliveryQuote();
  }
}
