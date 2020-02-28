
import { IsNumber, IsArray } from "class-validator";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class RoleEditInput {

  @Field( {
    description: 'ID da role'
  } )
  @IsNumber()
  role: number;

  @Field( type => Array( Int ), {
    description: 'Lista com os IDs das permissões'
  } )
  @IsArray()
  permissions: number[]
}
