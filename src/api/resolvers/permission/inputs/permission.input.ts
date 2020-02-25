import { Field, InputType } from 'type-graphql';

@InputType()
export class PermissionInput {

  @Field()
  operation: string;

  @Field()
  feature: string;
}
