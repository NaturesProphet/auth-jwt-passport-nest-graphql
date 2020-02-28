import { Field, InputType } from 'type-graphql';
import { GenericQuery } from '../../../../common/DTOs/genericQuery.query';
import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsEnum } from 'class-validator';
import { enumUserStatus } from '../../../../common/enums/userStatus.enum';

@InputType()
export class AdminQueryInput extends GenericQuery {
  @Field( {
    nullable: true,
    description: "nome do administrador"
  } )
  @IsOptional()
  @IsString()
  name: string;

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
    description: "status do administrador"
  } )
  @IsOptional()
  @IsEnum( enumUserStatus )
  status: string;

}
