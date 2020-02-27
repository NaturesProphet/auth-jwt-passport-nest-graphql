import { IsString, IsOptional, IsNumberString, IsDateString } from "class-validator";
import { GenericQuery } from "../../../../common/DTOs/genericQuery.query";
import { Field, InputType } from "type-graphql";

@InputType()
export class listLogsQuery extends GenericQuery {
  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  endpoint: string;

  @IsOptional()
  @IsNumberString()
  @Field( {
    nullable: true
  } )
  userId: number;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  accountType: string

  @IsOptional()
  @IsDateString()
  @Field( {
    nullable: true
  } )
  beforeDate: string;

  @IsOptional()
  @IsDateString()
  @Field( {
    nullable: true
  } )
  afterDate: string;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  response: number;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  ip: string;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  method: string;

  @IsOptional()
  @IsString()
  @Field( {
    nullable: true
  } )
  userAgent: string;
}
