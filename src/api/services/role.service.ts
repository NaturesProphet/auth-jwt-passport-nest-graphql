import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../../common/configs/repository.config';
import { Role } from '../../db/models/role.model';
import { RoleInput } from '../resolvers/role/inputs/role.input';
import { Permission } from '../../db/models/permission.model';
import { checkEntityAlreadExist } from '../../common/utils.util';



@Injectable()
export class RoleService {
  constructor(
    @Inject( repositoryConfig.role )
    private readonly roleRepository: Repository<Role>,
    @Inject( repositoryConfig.permission )
    private readonly permissionRepository: Repository<Permission>,
  ) { }


  async listRoles () {
    try {
      return await this.roleRepository.find( { relations: [ 'permissions' ] } );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async getRole ( id: number ) {
    try {
      return await this.roleRepository.findOne( id );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }


  async createRole ( input: RoleInput ) {
    let dto = input;
    let role = new Role();
    role.name = dto.name;
    role.description = dto.description;
    role.permissions = new Array();

    // busca as permissões
    for ( let i = 0; i < dto.permissions.length; i++ ) {
      let permission: Permission = null;
      try {
        permission = await this.permissionRepository.findOne( { id: dto.permissions[ i ] } );
      }
      catch ( err ) {
        throw new UnprocessableEntityException( `Erro ao buscar permissões. ${err.message}` );
      }
      if ( !permission ) {
        throw new UnprocessableEntityException( `Permissão ${dto.permissions[ i ]} não encontrada` );
      }
      role.permissions.push( permission );
    }

    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      checkEntityAlreadExist( err.message );
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }

}


