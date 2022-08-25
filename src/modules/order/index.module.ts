import {Module} from '@nestjs/common';

import {DeliveryService} from '@hom-module/order/delivery-service';
import {DeliveryController} from '@hom-module/order/delivery-controller';
import {IntegrationModule} from '@hom-module/integrations';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [IntegrationModule],
})
export class OrderModule {}
