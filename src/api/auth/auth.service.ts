import { Injectable, Inject, UnauthorizedException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { repositoryConfig } from '../../common/configs/repository.config';
import { GenericUser } from '../../db/models/super/genericUser.model';
import { AuthenticatedUser } from './DTOs/authenticatedUser.class';
import { Admin } from '../../db/models/admin.model';
import { Permission } from '../../db/models/permission.model';
import { Role } from '../../db/models/role.model';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async validateUser ( username: string, pass: string, accountType: string ): Promise<any> {
    let user: GenericUser;
    switch ( accountType ) {
      case 'admin':
        try {
          user = await this.adminRepository.createQueryBuilder( 'admin' )
            .addSelect( 'admin.passwordHash' )
            .leftJoinAndSelect( 'admin.role', 'role' )
            .leftJoinAndSelect( 'role.permissions', 'permissions' )
            .where( 'admin.email = :email', { email: username } )
            .andWhere( "admin.status != 'deleted'" )
            .getOne();
        } catch ( err ) {
          throw new UnprocessableEntityException( `Erro ao buscar dados do usuário. ${err.message}` );
        }
        if ( user ) {
          user.accountType = 'admin';
        }
        break;
      default:
        throw new UnauthorizedException( `Tipo de conta ${accountType} é desconhecida.` )
    }



    if ( !user ) {
      throw new UnauthorizedException( `Usuário ${username} não encontrado` )
    }



    if ( user && bcrypt.compareSync( pass, user.getPasswordHash() ) ) {
      if ( user.getStatus() == 'deleted' ) {
        return null;
      } else if ( user.getStatus() == 'suspended' ) {
        throw new ForbiddenException( `Sua conta foi suspensa. Entre em contato com a equipe de suporte` );
      } else if ( user.getStatus() == 'pendent' ) {
        throw new UnauthorizedException( `Sua conta ainda não foi ativada. Verifique seu e-mail.` );
      }
      return user;
    }
    return null;
  }


  async login ( user: any ) {
    const payload: AuthenticatedUser = {
      name: user.name,
      email: user.email,
      id: user.id,
      status: user.status,
      role: user.role,
      accountType: user.accountType
    };
    this.filter( payload );
    return {
      access_token: `bearer ${this.jwtService.sign( payload )}`,
      user: payload
    };
  }

  // remove lixo do payload para gerar um token menor
  private filter ( user: AuthenticatedUser ) {
    if ( user.role ) {
      let r = new Role();
      r.id = user.role.id;
      r.name = user.role.name;
      r.permissions = user.role.permissions ? user.role.permissions : null;
      user.role = r;
      if ( user.role.permissions ) {
        for ( let i = 0; i < user.role.permissions.length; i++ ) {
          let p = new Permission();
          p.feature = user.role.permissions[ i ].feature;
          p.operation = user.role.permissions[ i ].operation;
          user.role.permissions[ i ] = p;
        }
      }
    }
  }
}
