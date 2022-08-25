import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {InventoryResolver} from '@hom-graphql/resolvers';
import {InventoryController} from '@hom-module/inventory-controller';
import {InventoryService} from '@hom-module/inventory-service';
import {Inventory, InventorySchema} from '@hom-graphql/models';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, InventoryResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventory.name,
        schema: InventorySchema,
        collection: Inventory.name.toLowerCase(),
      },
    ]),
  ],
})
export class InventoryModule {}
