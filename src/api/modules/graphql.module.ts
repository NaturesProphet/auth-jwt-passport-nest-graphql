import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../db/Database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './admin.module';
import { LogModule } from '../logs/log.module';

const graphQLImports = [
  AdminModule, LogModule
];

@Module( {
  imports: [ DatabaseModule, GraphQLModule.forRoot( {
    autoSchemaFile: 'schema.gql',
    playground: true,
    context: async ( { req, connection } ) => {
      // subscriptions
      if ( connection ) {
        return { req: connection.context };
      }
      // queries and mutations
      return { req };
    }
  } ), ...graphQLImports ],

  providers: [],

  controllers: [],

  exports: [],
} )
export class GqlModule { }
