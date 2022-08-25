import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export interface IProductType extends Document {
  _id: MongooseSchema.Types.ObjectId;
  name: string;
}

@ObjectType()
@Schema()
export class ProductType implements IProductType {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;
}

export type ProductTypeDocument = ProductType & Document;
export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
