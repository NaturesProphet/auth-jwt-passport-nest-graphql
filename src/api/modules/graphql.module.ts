import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../db/Database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './admin.module';

const graphQLImports = [
  AdminModule
];

@Module( {
  imports: [ DatabaseModule, GraphQLModule.forRoot( {
    autoSchemaFile: 'schema.gql',
    playground: true,
  } ), ...graphQLImports ],

  providers: [],

  controllers: [],

  exports: [],
} )
export class GqlModule { }
