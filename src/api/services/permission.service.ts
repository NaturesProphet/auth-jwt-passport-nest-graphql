import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../../common/configs/repository.config';
import { Permission } from '../../db/models/permission.model';
import { PermissionInput } from '../resolvers/permission/inputs/permission.input';
import { checkEntityAlreadExist } from '../../common/utils.util';



@Injectable()
export class PermissionService {
  constructor(
    @Inject( repositoryConfig.permission )
    private readonly PermissionRepository: Repository<Permission>,
  ) { }


  async listPermissions () {
    try {
      return await this.PermissionRepository.find();
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async getPermission ( id: number ) {
    try {
      return await this.PermissionRepository.findOne( id );
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


