import {Module} from '@nestjs/common';

import {DoorDashService} from '@hom-module/integrations/doordash';

@Module({
  providers: [DoorDashService],
  imports: [],
  exports: [DoorDashService],
})
export class IntegrationModule {}
