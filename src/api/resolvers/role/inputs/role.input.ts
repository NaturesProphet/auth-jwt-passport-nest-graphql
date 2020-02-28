import { Field, InputType, Int } from 'type-graphql';
import { IsString, IsArray } from 'class-validator';

@InputType()
export class RoleInput {

  @Field( {
    description: 'Nome da nova role'
  } )
  @IsString()
  name: string;

  @Field( {
    description: 'descrição da nova role'
  } )
  @IsString()
  description: string;

  @Field( type => Array( Int ), {
    description: 'Lista com os IDs das permissões a serem adicionadas a nova role.'
  } )
  @IsArray()
  permissions: number[];

}
