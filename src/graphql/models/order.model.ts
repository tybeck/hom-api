import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Customer, CustomerSchema} from './customer.model';
import {Product, ProductSchema} from './product.model';

export interface IOrder extends Document {
  _id: MongooseSchema.Types.ObjectId;
  created: Date;
  orderId: number;
  type: string;
  active: boolean;
  paid: boolean;
  paymentMethod: string;
  onlineNet: number;
  totalCost: number;
  totalTax: number;
  promotionalDiscount: number;
  chargeId: number;
  customer: Customer;
  items: Product[];
  isComplete: boolean;
}

@ObjectType()
@Schema()
export class Order implements IOrder {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Date)
  @Prop()
  created: Date;

  @Field(() => Number)
  @Prop()
  orderId: number;

  @Field(() => String)
  @Prop()
  type: string;

  @Field(() => Boolean)
  @Prop()
  active: boolean;

  @Field(() => Boolean)
  @Prop()
  paid: boolean;

  @Field(() => String)
  @Prop()
  paymentMethod: string;

  @Field(() => Number)
  @Prop()
  onlineNet: number;

  @Field(() => Number)
  @Prop()
  totalCost: number;

  @Field(() => Number)
  @Prop()
  totalTax: number;

  @Field(() => Number)
  @Prop()
  promotionalDiscount: number;

  @Field(() => Number)
  @Prop()
  chargeId: number;

  @Field(() => Object)
  @Prop({type: CustomerSchema})
  customer: Customer;

  /**
   * @field items
   * Items deliverable for this order
   */
  @Field(() => Array)
  @Prop({type: ProductSchema})
  items: Product[];

  /**
   * @field isComplete
   * Is the order complete?
   */
  @Field(() => Boolean)
  @Prop()
  isComplete: boolean;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
