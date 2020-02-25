import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Admin } from '../../../db/models/admin.model';
import { AdminService } from '../../services/admin.service';
import { AdminInput } from './inputs/admin.input';

@Resolver()
export class AdminResolver {
  constructor( private readonly service: AdminService ) { }

  @Query( () => [ Admin ], { description: "listar os administradores do sistema" } )
  public async admins (): Promise<Admin[]> {
    return this.service.listAdmins();
  }


  @Query( () => Admin, { nullable: true, description: "listar dados de um administrador pelo seu ID" } )
  public async admin ( @Args( 'id' ) id: number ): Promise<Admin> {
    return this.service.getAdmin( id );
  }


  @Mutation( () => Admin, { description: "Criar um novo administrador" } )
  public async createAdmin ( @Args( 'data' ) input: AdminInput ):
    Promise<Admin> {
    return this.service.createAdmin( input );
  }


}
