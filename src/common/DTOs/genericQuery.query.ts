import { IsOptional, IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GenericQuery {
  @Field( {
    nullable: true,
    description: 'ID da entidade'
  } )
  @IsOptional()
  @IsNumber()
  id: number;


  @Field( {
    nullable: true,
    description: 'página da pesquisa'
  } )
  @IsOptional()
  @IsNumber()
  page: number;

  @Field( {
    nullable: true,
    description: 'limite de items por página'
  } )
  @IsOptional()
  @IsNumber()
  limit: number;
}
