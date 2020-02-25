import { Connection } from 'typeorm';
import { repositoryConfig } from '../../common/configs/repository.config';
import { Admin } from '../../db/models/admin.model';
import { Permission } from '../../db/models/permission.model';
import { Role } from '../../db/models/role.model';

export const AdminProviders = [
  {
    provide: repositoryConfig.admin,
    useFactory: ( connection: Connection ) => connection.getRepository( Admin ),
    inject: [ repositoryConfig.database ],
  },
  {
    provide: repositoryConfig.permission,
    useFactory: ( connection: Connection ) => connection.getRepository( Permission ),
    inject: [ repositoryConfig.database ],
  },
  {
    provide: repositoryConfig.role,
    useFactory: ( connection: Connection ) => connection.getRepository( Role ),
    inject: [ repositoryConfig.database ],
  },
];
