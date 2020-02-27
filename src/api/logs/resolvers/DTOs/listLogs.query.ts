import { IsString, IsOptional, IsNumberString, IsDateString } from "class-validator";
import { GenericQuery } from "../../../../common/DTOs/genericQuery.query";
import { Field, InputType } from "type-graphql";

@InputType()
export class listLogsQuery extends GenericQuery {
  @IsOptional()
  @IsString()
  @Field( {
    nullable: true,
    description: 'rota da API que originou o log'
  } )
  endpoint: string;

  @IsOptional()
  @IsNumberString()
  @Field( {
    nullable: true,
    description: 'ID do usuário que gerou o log'
  } )
  userId: number;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true,
    description: 'Tipo de conta do usuário que gerou o log'
  } )
  accountType: string

  @IsOptional()
  @IsDateString()
  @Field( {
    nullable: true,
    description: 'Logs antes desta data'
  } )
  beforeDate: string;

  @IsOptional()
  @IsDateString()
  @Field( {
    nullable: true,
    description: 'logs após esta data'
  } )
  afterDate: string;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true,
    description: 'IP da requisição que gerou o log'
  } )
  ip: string;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true,
    description: 'Dispositivo ou sistema que enviou a requisição'
  } )
  userAgent: string;
}
