import {Query, Resolver} from '@nestjs/graphql';
import {forwardRef, Inject} from '@nestjs/common';

import {Inventory, InventoryDocument} from '@hom-graphql/models';
import {InventoryService} from '@hom-module/inventory-service';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(@Inject(forwardRef(() => InventoryService)) private inventory: InventoryService) {}

  @Query(() => [Inventory])
  async getInventory(): Promise<Pick<InventoryDocument[], keyof Array<InventoryDocument>>> {
    return this.inventory.getInventory();
  }
}
