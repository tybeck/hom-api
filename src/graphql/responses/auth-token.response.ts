import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class AuthTokenResponse {
  @Field()
  isValid: boolean;
}
