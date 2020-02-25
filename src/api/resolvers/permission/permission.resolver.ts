import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '../../../db/models/permission.model';
import { PermissionInput } from './inputs/permission.input';
import { PermissionService } from '../../../api/services/permission.service';



@Resolver()
export class PermissionResolver {
  constructor( private readonly service: PermissionService ) { }

  @Query( () => [ Permission ] )
  public async Permissions (): Promise<Permission[]> {
    return this.service.listPermissions();
  }


  @Query( () => Permission, { nullable: true } )
  public async Permission ( @Args( 'id' ) id: number ): Promise<Permission> {
    return this.service.getPermission( id );
  }


  @Mutation( () => Permission )
  public async createPermission ( @Args( 'data' ) input: PermissionInput ):
    Promise<Permission> {
    return this.service.createPermission( input );
  }


}
