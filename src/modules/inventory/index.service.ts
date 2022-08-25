import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {LeanDocument, Model} from 'mongoose';

import {Inventory, InventoryDocument, IInventory} from '@hom-graphql/models';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Inventory.name) private inventory: Model<InventoryDocument>) {}

  async getInventory(): Promise<LeanDocument<IInventory[]>> {
    return this.inventory.find().lean<IInventory[]>().exec();
  }
}
