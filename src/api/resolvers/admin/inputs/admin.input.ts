import { Field, InputType } from 'type-graphql';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

@InputType()
export class AdminInput {
  @Field( {
    description: "nome do administrador"
  } )
  @IsString()
  name: string;

  @Field( {
    description: "aniversário administrador"
  } )
  @IsString()
  birthDay: Date;

  @Field( {
    description: "email do administrador"
  } )
  @IsEmail()
  email: string;

  @IsString()
  @Field( {
    description: "CPF do administrador"
  } )
  cpf: string;

  @IsPhoneNumber( 'BR' )
  @Field( {
    description: "telefone do administrador"
  } )
  phone: string;

  @IsString()
  @Field( {
    description: "nova senha do administrador"
  } )
  password: string;

}
