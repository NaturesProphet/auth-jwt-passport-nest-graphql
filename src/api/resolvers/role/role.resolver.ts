import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '../../../db/models/role.model';
import { RoleInput } from './inputs/role.input';
import { RoleService } from '../../../api/services/role.service';

@Resolver()
export class RoleResolver {
  constructor( private readonly service: RoleService ) { }

  @Query( () => [ Role ] )
  public async roles (): Promise<Role[]> {
    return this.service.listRoles();
  }


  @Query( () => Role, { nullable: true } )
  public async role ( @Args( 'id' ) id: number ): Promise<Role> {
    return this.service.getRole( id );
  }


  @Mutation( () => Role )
  public async createRole ( @Args( 'data' ) input: RoleInput ):
    Promise<Role> {
    return this.service.createRole( input );
  }


}
