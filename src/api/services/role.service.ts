import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../../common/configs/repository.config';
import { Role } from '../../db/models/role.model';
import { RoleInput } from '../resolvers/role/inputs/role.input';
import { checkEntityAlreadExist } from '../../common/utils.util';
import { RoleQueryInput } from '../resolvers/role/inputs/role.query';
import { paginate } from 'nestjs-typeorm-paginate';
import { Permission } from '../../db/models/permission.model';
import { RoleEditInput } from '../resolvers/role/inputs/role.edit';



@Injectable()
export class RoleService {
  constructor(
    @Inject( repositoryConfig.role )
    private readonly roleRepository: Repository<Role>,
    @Inject( repositoryConfig.permission )
    private readonly permissionRepository: Repository<Permission>,
  ) { }


  async listRoles ( query: RoleQueryInput ) {
    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1

    let qb = this.roleRepository.createQueryBuilder( 'role' );
    qb.where( '1=1' );
    qb.leftJoinAndSelect( 'role.permissions', 'permissions' );
    qb.orderBy( 'role.id', 'DESC' );

    if ( query.id ) {
      qb.andWhere( 'role.id = :id', { id: query.id } )
    }
    if ( query.name ) {
      qb.andWhere( 'role.name = :name', { name: query.name } );
    }


    try {
      let results = await paginate<Role>( qb, { page: page, limit: limit } );
      return results.items;
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

  async removePermissionsToRole ( query: RoleEditInput ) {
    let dto = query;

    let role: Role;
    let permissions: Permission[];

    try {
      role = await this.roleRepository.createQueryBuilder( 'r' )
        .leftJoinAndSelect( 'r.permissions', 'permissions' )
        .where( 'r.id = :id', { id: dto.role } )
        .getOne();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de roles. ${err.message}` );
    }
    if ( !role ) {
      throw new UnprocessableEntityException( `Role ${dto.role} não encontrada` );
    }

    try {
      permissions = await this.permissionRepository.createQueryBuilder( 'p' )
        .where( `p.id IN (${dto.permissions})` )
        .getMany();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de permissions. ${err.message}` );
    }
    if ( !permissions || permissions.length == 0 ) {
      throw new UnprocessableEntityException( `Permissões não encontradas` );
    }
    if ( permissions.length != dto.permissions.length ) {
      throw new UnprocessableEntityException( `Nem todas as permissões foram encontradas.`
        + `(Encontrado um total de ${permissions.length} de ${dto.permissions.length}). `
        + `Confira a lista de permissões que você enviou` );
    }



    for ( let i = 0; i < permissions.length; i++ ) {
      let permissionId = permissions[ i ].id;
      let isIn = false;

      for ( let z = 0; z < role.permissions.length; z++ ) {
        if ( role.permissions[ z ] && role.permissions[ z ].id == permissionId ) {
          isIn = true;
          role.permissions[ z ] = null;
          break;
        }
      }
      if ( isIn == false ) {
        throw new UnprocessableEntityException( `A permissão ${permissionId} não `
          + `foi encontrada na role ${dto.role}` );
      }
    }

    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }

  async addPermissionsToRole ( query: RoleEditInput ) {
    let dto = query;

    let role: Role;
    let permissions: Permission[];

    try {
      role = await this.roleRepository.createQueryBuilder( 'r' )
        .leftJoinAndSelect( 'r.permissions', 'permissions' )
        .where( 'r.id = :id', { id: dto.role } )
        .getOne();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de roles. ${err.message}` );
    }
    if ( !role ) {
      throw new UnprocessableEntityException( `Role ${dto.role} não encontrada` );
    }

    try {
      permissions = await this.permissionRepository.createQueryBuilder( 'permission' )
        .where( `permission.id IN (${dto.permissions})` )
        .getMany();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de permissions. ${err.message}` );
    }
    if ( !permissions || permissions.length == 0 ) {
      throw new UnprocessableEntityException( `Permissões não encontradas` );
    }
    if ( permissions.length != dto.permissions.length ) {
      throw new UnprocessableEntityException( `Nem todas as permissões foram encontradas.`
        + `(Encontrado um total de ${permissions.length} de ${dto.permissions.length}). `
        + `Confira a lista de permissões que você enviou` );
    }


    for ( let i = 0; i < permissions.length; i++ ) {
      for ( let z = 0; z < role.permissions.length; z++ ) {
        if ( role.permissions[ z ].id == permissions[ i ].id ) {
          throw new UnprocessableEntityException( `A permissão ${permissions[ i ].id} `
            + `já faz parte da role ${role.id}` );
        }
      }
      role.permissions.push( permissions[ i ] );
    }


    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }

}


