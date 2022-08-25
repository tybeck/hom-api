import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Strategy} from './auth/strategy.model';

export interface ICustomer extends Document {
  // Created from initial SSO
  _id: MongooseSchema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  offers: boolean;
  phone: string;
  created: Date;
  rewardPoints: number;
  redeems: number;
  strategies: Strategy[];
}

@ObjectType()
@Schema()
export class Customer implements ICustomer {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  firstName: string;

  @Field(() => String)
  @Prop()
  lastName: string;

  @Field(() => Boolean)
  @Prop()
  admin: boolean;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => Boolean)
  @Prop()
  offers: boolean;

  @Field(() => String)
  @Prop()
  phone: string;

  @Field(() => Date)
  @Prop()
  created: Date;

  @Field(() => Number)
  @Prop()
  rewardPoints: number;

  @Field(() => Number)
  @Prop()
  redeems: number;

  @Field(() => Strategy)
  @Prop()
  strategies: Strategy[];
}

export type CustomerDocument = Customer & Document;
export const CustomerSchema = SchemaFactory.createForClass(Customer);
