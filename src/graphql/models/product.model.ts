import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {Meat, MeatSchema} from './meat.model';
import {Cheese, CheeseSchema} from './cheese.model';
import {Condiment, CondimentSchema} from './condiment.model';

export interface IProduct extends Document {
  _id: MongooseSchema.Types.ObjectId;
  name: string;
  price: number;
  id: string;
  meats: Meat[];
  cheeses: Cheese[];
  condiments: Condiment[];
  type: MongooseSchema.Types.ObjectId;
  notes: string;
  created: Date;
  updated: Date;
  isComplete?: boolean;
}

@ObjectType()
@Schema()
export class Product implements IProduct {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  @Prop()
  price: number;

  @Field(() => String)
  @Prop()
  id: string;

  @Field(() => Array)
  @Prop({type: MeatSchema})
  meats: Meat[];

  @Field(() => Array)
  @Prop({type: CheeseSchema})
  cheeses: Cheese[];

  @Field(() => Array)
  @Prop({type: CondimentSchema})
  condiments: Condiment[];

  @Field(() => Boolean)
  @Prop()
  askForCheese: boolean;

  @Field(() => Int)
  @Prop()
  type: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  notes: string;

  @Field(() => Date)
  @Prop()
  created: Date;

  @Field(() => Date)
  @Prop()
  updated: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
