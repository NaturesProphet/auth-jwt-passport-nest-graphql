import { Field, InputType } from 'type-graphql';

@InputType()
export class PermissionInput {

  @Field( {
    description: 'operação. exemplos: edit, list, delete, create'
  } )
  operation: string;

  @Field( {
    description: 'recurso. exemplo: admin, log'
  } )
  feature: string;
}
