import {Document, Schema as MongooseSchema} from 'mongoose/lib/index';
import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export interface IHour extends Document {
  _id: MongooseSchema.Types.ObjectId;
  day: string;
  opens: string;
  closes: string;
}

@ObjectType()
@Schema()
export class Hour implements IHour {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  day: string;

  @Field(() => String)
  @Prop()
  opens: string;

  @Field(() => String)
  @Prop()
  closes: string;
}

export type HourDocument = Hour & Document;
export const HourSchema = SchemaFactory.createForClass(Hour);
