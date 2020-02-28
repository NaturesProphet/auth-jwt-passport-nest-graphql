import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from '../../db/models/admin.model';
import { repositoryConfig } from '../../common/configs/repository.config';
import { AdminInput } from '../resolvers/admin/inputs/admin.input';
import { checkEntityAlreadExist } from '../../common/utils.util';
import { AdminEditInput } from '../resolvers/admin/inputs/admin.edit';
import { AdminQueryInput } from '../resolvers/admin/inputs/admin.query';
import { paginate } from 'nestjs-typeorm-paginate';



@Injectable()
export class AdminService {
  constructor(
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
  ) { }


  async listAdmins ( query: AdminQueryInput ) {
    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1

    let qb = this.adminRepository.createQueryBuilder( 'admin' );
    qb.leftJoinAndSelect( 'admin.role', 'role' )
    qb.where( '1=1' );
    qb.orderBy( 'admin.id', 'DESC' );

    if ( query.id ) {
      qb.andWhere( 'admin.id = :id', { id: query.id } )
    }
    if ( query.cpf ) {
      qb.andWhere( 'admin.cpf = :cpf', { cpf: query.cpf } );
    }
    if ( query.email ) {
      qb.andWhere( 'admin.email = :email', { email: query.email } )
    }
    if ( query.name ) {
      qb.andWhere( 'admin.name = :name', { name: query.name } );
    }
    if ( query.phone ) {
      qb.andWhere( 'admin.phone = :phone', { phone: query.phone } );
    }
    if ( query.status ) {
      qb.andWhere( 'admin.status = :status', { status: query.status } );
    }

    try {
      let results = await paginate<Admin>( qb, { page: page, limit: limit } );
      return results.items;
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

  async editAdmin ( dto: AdminEditInput ) {
    let adm: Admin;
    try {
      adm = await this.adminRepository.findOne( dto.id );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao consultar dados. ${err.message}` );
    }
    if ( !adm ) {
      throw new UnprocessableEntityException( `Administrador ${dto.id} inválido` );
    }

    if ( dto.birthDay ) {
      adm.birthDay = dto.birthDay
    }
    if ( dto.cpf ) {
      adm.cpf = dto.cpf;
    }
    if ( dto.email ) {
      adm.email = dto.email;
    }
    if ( dto.name ) {
      adm.name = dto.name;
    }
    if ( dto.password ) {
      adm.setPassword( dto.password );
    }
    if ( dto.phone ) {
      adm.phone = dto.phone;
    }
    if ( dto.status ) {
      adm.status = dto.status
    }

    try {
      return await this.adminRepository.save( adm );
    }
    catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao atualizar dados. ${err.message}` );
    }
  }


}



