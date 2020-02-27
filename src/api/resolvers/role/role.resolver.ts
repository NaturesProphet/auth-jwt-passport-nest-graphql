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
@Resolver()
export class RoleResolver {
  constructor( private readonly service: RoleService ) { }


  @UseGuards( GqlAuthGuard )
  @Query( () => [ Role ] )
  public async roles ( @GqlUser() user ): Promise<Role[]> {
    adminOnly( user );
    return this.service.listRoles();
  }


  @UseGuards( GqlAuthGuard )
  @Query( () => Role, { nullable: true } )
  public async role ( @Args( 'id' ) id: number, @GqlUser() user ): Promise<Role> {
    adminOnly( user );
    return this.service.getRole( id );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Role )
  public async createRole ( @Args( 'data' ) input: RoleInput, @GqlUser() user ):
    Promise<Role> {
    adminOnly( user );
    return this.service.createRole( input );
  }


}
