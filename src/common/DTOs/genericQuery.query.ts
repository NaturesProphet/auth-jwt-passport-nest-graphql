import { IsOptional, IsNumberString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GenericQuery {

  @IsOptional()
  @IsNumberString()
  @Field( {
    nullable: true,
    description: 'página da pesquisa'
  } )
  page: number;

  @Field( {
    nullable: true,
    description: 'limite de items por página'
  } )
  @IsOptional()
  @IsNumberString()
  limit: number;
}
