import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../DTOs/authenticatedUser.class';
import { apiJWTKey } from '../../../common/configs/api.conf';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor() {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiJWTKey,
    } );
  }

  async validate ( payload: any ) {
    let user: AuthenticatedUser = {
      email: payload.email,
      id: payload.id,
      name: payload.name,
      status: payload.status,
      accountType: payload.accountType
    }
    return user;
  }
}
