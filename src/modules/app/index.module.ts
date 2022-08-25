import {Module} from '@nestjs/common';

import {AuthModule} from '@hom-module/auth';
import {DatabaseModule} from '@hom-module/db';
import {GlobalModule} from '@hom-module/global';
import {InventoryModule} from '@hom-module/inventory';
import {OrderModule} from '@hom-module/order';
import {IntegrationModule} from '@hom-module/integrations';
import {CategoryModule} from '@hom-module/category';
import {JobModule} from '@hom-module/jobs';
import {ReviewModule} from '@hom-module/reviews';
import {PostModule} from '@hom-module/posts';
import {SettingModule} from '@hom-module/settings';

@Module({
  imports: [
    GlobalModule,
    JobModule,
    DatabaseModule,
    // Application Modules
    AuthModule,
    IntegrationModule,
    // Feature Modules
    PostModule,
    ReviewModule,
    InventoryModule,
    CategoryModule,
    OrderModule,
    SettingModule,
  ],
})
export class AppModule {}
