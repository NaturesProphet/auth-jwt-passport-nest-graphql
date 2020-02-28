import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../../common/configs/repository.config';
import { Permission } from '../../db/models/permission.model';
import { PermissionInput } from '../resolvers/permission/inputs/permission.input';
import { checkEntityAlreadExist } from '../../common/utils.util';
import { PermissionQueryInput } from '../resolvers/permission/inputs/permission.query';
import { paginate } from 'nestjs-typeorm-paginate';



@Injectable()
export class PermissionService {
  constructor(
    @Inject( repositoryConfig.permission )
    private readonly PermissionRepository: Repository<Permission>,
  ) { }


  async listPermissions ( query: PermissionQueryInput ) {
    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1

    let qb = this.PermissionRepository.createQueryBuilder( 'permission' );
    qb.where( '1=1' );
    qb.orderBy( 'permission.id', 'DESC' );

    if ( query.id ) {
      qb.andWhere( 'permission.id = :id', { id: query.id } )
    }
    if ( query.operation ) {
      qb.andWhere( 'permission.operation = :operation', { operation: query.operation } );
    }
    if ( query.feature ) {
      qb.andWhere( 'permission.feature', { feature: query.feature } );
    }


    try {
      let results = await paginate<Permission>( qb, { page: page, limit: limit } );
      return results.items;
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async createPermission ( input: PermissionInput ) {
    let p = new Permission();
    p.feature = input.feature;
    p.operation = input.operation;
    try {
      return await this.PermissionRepository.save( p );
    } catch ( err ) {
      checkEntityAlreadExist( err.message );
      throw new UnprocessableEntityException( err.message )
    }
  }

}


