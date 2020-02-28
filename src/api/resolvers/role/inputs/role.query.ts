import { Field, InputType } from 'type-graphql';
import { GenericQuery } from '../../../../common/DTOs/genericQuery.query';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class RoleQueryInput extends GenericQuery {

  @Field( {
    nullable: true,
    description: 'Nome da role'
  } )
  @IsOptional()
  @IsString()
  name: string;

}
