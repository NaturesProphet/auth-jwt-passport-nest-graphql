import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../../../db/models/role.model';
import { RoleInput } from './inputs/role.input';
import { RoleService } from '../../../api/services/role.service';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { LogInterceptor } from '../../../api/logs/log.interceptor';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';

@UseInterceptors( LogInterceptor )
@Resolver( 'Roles Administrativas' )
export class RoleResolver {
  constructor( private readonly service: RoleService ) { }


  @UseGuards( GqlAuthGuard )
  @Query( () => [ Role ], {
    description: 'listar as roles administrativas'
  } )
  public async roles ( @GqlUser() user ): Promise<Role[]> {
    adminOnly( user );
    return this.service.listRoles();
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Role, {
    description: 'Cria uma nova role administrativa'
  } )
  public async createRole ( @Args( 'data' ) input: RoleInput, @GqlUser() user ):
    Promise<Role> {
    adminOnly( user );
    return this.service.createRole( input );
  }


}
