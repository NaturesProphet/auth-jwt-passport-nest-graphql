import { createConnection } from 'typeorm';
import * as config from '../../common/configs/database.conf';
import { repositoryConfig } from '../../common/configs/repository.config'
import { Admin } from '../models/admin.model';
import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';
import { Log } from '../../api/logs/models/log.model';

export const databaseProviders = [
  {
    provide: repositoryConfig.database,
    useFactory: async () =>
      await createConnection( {
        type: 'postgres',
        host: config.db_host,
        port: config.db_port,
        username: config.db_username,
        password: config.db_password,
        database: config.db_schema,
        entities: [
          Admin, Permission, Role, Log
        ],
        synchronize: config.orm_sync,
        dropSchema: config.drop_schema
      } ),
  },
];
