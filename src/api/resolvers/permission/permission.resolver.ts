import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '../../../db/models/permission.model';
import { PermissionInput } from './inputs/permission.input';
import { PermissionService } from '../../../api/services/permission.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { LogInterceptor } from '../../../api/logs/log.interceptor';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';
import { PermissionQueryInput } from './inputs/permission.query';



@UseInterceptors( LogInterceptor )
@Resolver( 'Permissões' )
export class PermissionResolver {
  constructor( private readonly service: PermissionService ) { }

  @UseGuards( GqlAuthGuard )
  @Query( () => [ Permission ], {
    description: 'Listar permissões básicas'
  } )
  @UseGuards( GqlAuthGuard )
  public async listPermissions ( @GqlUser() user, @Args( 'query' ) query: PermissionQueryInput ): Promise<Permission[]> {
    adminOnly( user );
    return this.service.listPermissions( query );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Permission, {
    description: 'Cria uma nova permissão básica'
  } )
  public async createPermission ( @GqlUser() user, @Args( 'data' ) input: PermissionInput ):
    Promise<Permission> {
    adminOnly( user );
    return this.service.createPermission( input );
  }


}
