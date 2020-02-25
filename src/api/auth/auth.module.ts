import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthProviders } from './auth.provider';
import { DatabaseModule } from '../../db/Database/database.module';
import { apiJWTKey, jwtExpirationTime } from '../../common/configs/api.conf';


@Module( {
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register( {
      secret: apiJWTKey,
      signOptions: { expiresIn: jwtExpirationTime },
    } ),
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy, ...AuthProviders ],
  controllers: [ AuthController ],
  exports: [ AuthService ],
} )
export class AuthModule { }
