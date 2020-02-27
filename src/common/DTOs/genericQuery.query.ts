import { IsOptional, IsNumberString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GenericQuery {

  @IsOptional()
  @IsNumberString()
  @Field( {
    nullable: true
  } )
  page: number;

  @Field( {
    nullable: true
  } )
  @IsOptional()
  @IsNumberString()
  limit: number;
}
