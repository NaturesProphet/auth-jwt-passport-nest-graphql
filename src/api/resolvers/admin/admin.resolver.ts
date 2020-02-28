import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Admin } from '../../../db/models/admin.model';
import { AdminService } from '../../services/admin.service';
import { AdminInput } from './inputs/admin.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';
import { GqlUser } from '../../../api/auth/decorators/decorators';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';
import { LogInterceptor } from '../../../api/logs/log.interceptor';
import { AdminEditInput } from './inputs/admin.edit';
import { AdminQueryInput } from './inputs/admin.query';

@UseInterceptors( LogInterceptor )
@Resolver( 'Administradores' )
export class AdminResolver {
  constructor( private readonly service: AdminService ) { }


  @UseGuards( GqlAuthGuard )
  @Query( () => [ Admin ], { description: "listar os administradores do sistema" } )
  public async listAdmins ( @GqlUser() user, @Args( 'query' ) query: AdminQueryInput ): Promise<Admin[]> {
    adminOnly( user );
    return this.service.listAdmins( query );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Admin, { description: "Criar um novo administrador" } )
  public async createAdmin ( @Args( 'data' ) input: AdminInput, @GqlUser() user ):
    Promise<Admin> {
    adminOnly( user );
    return this.service.createAdmin( input );
  }


  @UseGuards( GqlAuthGuard )
  @Mutation( () => Admin, { description: "Atualizar dados de admin" } )
  public async editAdmin ( @Args( 'data' ) input: AdminEditInput, @GqlUser() user ):
    Promise<Admin> {
    adminOnly( user );
    return this.service.editAdmin( input );
  }

}

