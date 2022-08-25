import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export interface IInventory extends Document {
  _id: MongooseSchema.Types.ObjectId;
  name: string;
  value: number;
}

@ObjectType()
@Schema()
export class Inventory implements IInventory {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Int)
  @Prop()
  value: number;
}

export type InventoryDocument = Inventory & Document;
export const InventorySchema = SchemaFactory.createForClass(Inventory);
