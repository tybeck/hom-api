import {Field, ObjectType} from '@nestjs/graphql';
import {StrategyType} from '@hom-module/auth/types';

@ObjectType()
export class Strategy {
  @Field(() => String)
  type: StrategyType;

  @Field()
  id: string;

  @Field()
  isActivelySignedIn?: boolean;

  @Field()
  token?: string;
}
