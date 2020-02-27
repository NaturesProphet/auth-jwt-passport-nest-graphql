import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '../../../db/models/permission.model';
import { PermissionInput } from './inputs/permission.input';
import { PermissionService } from '../../../api/services/permission.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { LogInterceptor } from '../../../api/logs/log.interceptor';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';



@UseInterceptors( LogInterceptor )
@Resolver()
export class PermissionResolver {
  constructor( private readonly service: PermissionService ) { }

  @UseGuards( GqlAuthGuard )
  @Query( () => [ Permission ] )
  @UseGuards( GqlAuthGuard )
  public async Permissions ( @GqlUser() user ): Promise<Permission[]> {
    adminOnly( user );
    return this.service.listPermissions();
  }


  @UseGuards( GqlAuthGuard )
  @Query( () => Permission, { nullable: true } )
  public async Permission ( @GqlUser() user, @Args( 'id' ) id: number ): Promise<Permission> {
    adminOnly( user );
    return this.service.getPermission( id );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Permission )
  public async createPermission ( @GqlUser() user, @Args( 'data' ) input: PermissionInput ):
    Promise<Permission> {
    adminOnly( user );
    return this.service.createPermission( input );
  }


}
