import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from '../../db/models/admin.model';
import { repositoryConfig } from '../../common/configs/repository.config';
import { AdminInput } from '../resolvers/admin/inputs/admin.input';
import { checkEntityAlreadExist } from '../../common/utils.util';



@Injectable()
export class AdminService {
  constructor(
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
  ) { }


  async listAdmins () {
    try {
      return await this.adminRepository.find( { relations: [ 'role' ] } );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async getAdmin ( id: number ) {
    try {
      return await this.adminRepository.findOne( id );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async createAdmin ( input: AdminInput ) {
    let adm = new Admin();
    adm.birthDay = input.birthDay;
    adm.cpf = input.cpf;
    adm.email = input.email;
    adm.phone = input.phone;
    adm.name = input.name;
    adm.setPassword( input.password );
    try {
      return await this.adminRepository.save( adm );
    } catch ( err ) {
      checkEntityAlreadExist( err.message );
      throw new UnprocessableEntityException( err.emssage )
    }
  }

}


