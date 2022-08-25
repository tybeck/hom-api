import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ObjectType, Field} from '@nestjs/graphql';

export interface ISetting extends Document {
  _id: MongooseSchema.Types.ObjectId;
  key: string;
  value: string;
}

@ObjectType()
@Schema()
export class Setting implements ISetting {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  key: string;

  @Field(() => String)
  @Prop()
  value: string;
}

export type SettingDocument = ISetting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
