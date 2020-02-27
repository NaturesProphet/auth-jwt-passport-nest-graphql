import { Connection } from 'typeorm';
import { Log } from './models/log.model';
import { repositoryConfig } from '../../common/configs/repository.config';

export const LogProvider = [
  {
    provide: repositoryConfig.logs,
    useFactory: ( connection: Connection ) => connection.getRepository( Log ),
    inject: [ repositoryConfig.database ],
  },
];
