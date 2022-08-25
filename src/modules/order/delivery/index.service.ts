import {forwardRef, Inject, Injectable} from '@nestjs/common';

import {DoorDashService} from '@hom-module/integrations/doordash';

@Injectable()
export class DeliveryService {
  constructor(@Inject(forwardRef(() => DoorDashService)) private doordash: DoorDashService) {
    //
  }

  async getDeliveryQuote() {
    return this.doordash.getDeliveryQuote();
  }
}
