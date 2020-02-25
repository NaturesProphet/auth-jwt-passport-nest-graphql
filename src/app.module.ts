import { Module } from '@nestjs/common';
import { GqlModule } from './api/modules/graphql.module';
import { AuthModule } from './api/auth/auth.module';


@Module( {
  imports: [ GqlModule, AuthModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
