import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Admin } from '../../../db/models/admin.model';
import { AdminService } from '../../services/admin.service';
import { AdminInput } from './inputs/admin.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { adminOnly } from 'src/api/auth/strategys/functions.auth';


@Resolver()
export class AdminResolver {
  constructor( private readonly service: AdminService ) { }


  @UseGuards( GqlAuthGuard )
  @Query( () => [ Admin ], { description: "listar os administradores do sistema" } )
  public async admins ( @GqlUser() user ): Promise<Admin[]> {
    adminOnly( user );
    return this.service.listAdmins();
  }


  @Query( () => Admin, { nullable: true, description: "listar dados de um administrador pelo seu ID" } )
  public async admin ( @Args( 'id' ) id: number, @GqlUser() user ): Promise<Admin> {
    adminOnly( user );
    return this.service.getAdmin( id );
  }


  @Mutation( () => Admin, { description: "Criar um novo administrador" } )
  public async createAdmin ( @Args( 'data' ) input: AdminInput, @GqlUser() user ):
    Promise<Admin> {
    adminOnly( user );
    return this.service.createAdmin( input );
  }

}

