import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class RoleInput {

  @Field( {
    description: 'Nome da nova role'
  } )
  name: string;

  @Field( {
    description: 'descrição da nova role'
  } )
  description: string;

  @Field( type => Array( Int ), {
    description: 'Lista com os IDs das permissões a serem adicionadas a nova role.'
  } )
  permissions: number[];

}
