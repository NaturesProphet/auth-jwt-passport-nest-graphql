import { Field, InputType } from 'type-graphql';
import { GenericQuery } from '../../../../common/DTOs/genericQuery.query';
import { IsOptional, IsEnum } from 'class-validator';
import { EnumPermissionOperation } from '../../../../common/enums/operation.enum';
import { EnumPermissionFeature } from '../../../../common/enums/feature.enum';

@InputType()
export class PermissionQueryInput extends GenericQuery {
  @Field( {
    nullable: true,
    description: 'operação. exemplos: edit, list, delete, create'
  } )
  @IsOptional()
  @IsEnum( EnumPermissionOperation )
  operation: string;

  @Field( {
    nullable: true,
    description: 'recurso. exemplo: admin, log'
  } )
  @IsOptional()
  @IsEnum( EnumPermissionFeature )
  feature: string;

}
