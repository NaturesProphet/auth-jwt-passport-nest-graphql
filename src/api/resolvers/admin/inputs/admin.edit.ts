import { Field, InputType } from 'type-graphql';
import { IsNumber, IsOptional, IsString, IsEmail, IsPhoneNumber, IsEnum, IsDate } from 'class-validator';
import { enumUserStatus } from '../../../../common/enums/userStatus.enum';

@InputType()
export class AdminEditInput {

  @Field( {
    description: "ID do administrador"
  } )
  @IsOptional()
  @IsNumber()
  id: number;

  @Field( {
    nullable: true,
    description: "nome do administrador"
  } )
  @IsOptional()
  @IsString()
  name: string;

  @Field( {
    nullable: true,
    description: "aniversário administrador"
  } )
  @IsOptional()
  @IsDate()
  birthDay: Date;

  @Field( {
    nullable: true,
    description: "email do administrador"
  } )
  @IsOptional()
  @IsEmail()
  email: string;


  @Field( {
    nullable: true,
    description: "CPF do administrador"
  } )
  @IsOptional()
  @IsString()
  cpf: string;

  @Field( {
    nullable: true,
    description: "telefone do administrador"
  } )
  @IsOptional()
  @IsPhoneNumber( 'BR' )
  phone: string;

  @Field( {
    nullable: true,
    description: "nova senha do administrador"
  } )
  @IsOptional()
  @IsString()
  password: string;

  @Field( {
    nullable: true,
    description: "status do administrador"
  } )
  @IsOptional()
  @IsEnum( enumUserStatus )
  status: string;

}
