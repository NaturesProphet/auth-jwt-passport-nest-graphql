import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../../../db/models/role.model';
import { RoleInput } from './inputs/role.input';
import { RoleService } from '../../../api/services/role.service';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { LogInterceptor } from '../../../api/logs/log.interceptor';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';
import { RoleQueryInput } from './inputs/role.query';
import { RoleEditInput } from './inputs/role.edit';

@UseInterceptors( LogInterceptor )
@Resolver( 'Roles Administrativas' )
export class RoleResolver {
  constructor( private readonly service: RoleService ) { }


  @UseGuards( GqlAuthGuard )
  @Query( () => [ Role ], {
    description: 'listar as roles administrativas'
  } )
  public async listRoles ( @GqlUser() user, @Args( 'query' ) query: RoleQueryInput ): Promise<Role[]> {
    adminOnly( user, 'list', 'role' );
    return this.service.listRoles( query );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Role, {
    description: 'Cria uma nova role administrativa'
  } )
  public async createRole ( @Args( 'data' ) input: RoleInput, @GqlUser() user ):
    Promise<Role> {
    adminOnly( user, 'create', 'role' );
    return this.service.createRole( input );
  }



  @UseGuards( GqlAuthGuard )
  @Mutation( () => Role, {
    description: 'Adiciona uma lista de permissões à uma role'
  } )
  public async editRoleAddingPermissions ( @Args( 'dto' ) dto: RoleEditInput, @GqlUser() user ):
    Promise<Role> {
    adminOnly( user, 'edit', 'role' );
    return this.service.addPermissionsToRole( dto );
  }



  @UseGuards( GqlAuthGuard )
  @Mutation( () => Role, {
    description: 'Remove uma lista de permissões de uma role'
  } )
  public async editRoleRemovingPermissions ( @Args( 'dto' ) dto: RoleEditInput, @GqlUser() user ):
    Promise<Role> {
    adminOnly( user, 'edit', 'role' );
    return this.service.removePermissionsToRole( dto );
  }


}
