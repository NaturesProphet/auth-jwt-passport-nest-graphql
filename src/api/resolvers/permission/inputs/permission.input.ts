import { Field, InputType } from 'type-graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { EnumPermissionFeature } from '../../../../common/enums/feature.enum';
import { EnumPermissionOperation } from '../../../../common/enums/operation.enum';

@InputType()
export class PermissionInput {

  @Field( {
    description: 'operação. exemplos: edit, list, delete, create'
  } )
  @IsEnum( EnumPermissionOperation )
  operation: string;

  @Field( {
    description: 'recurso. exemplo: admin, log'
  } )
  @IsEnum( EnumPermissionFeature )
  feature: string;
}
