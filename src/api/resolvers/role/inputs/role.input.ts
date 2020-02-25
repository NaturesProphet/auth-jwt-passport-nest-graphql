import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class RoleInput {

  @Field()
  name: string;

  @Field()
  description: string;

  @Field( type => Array( Int ) )
  permissions: number[];

}
