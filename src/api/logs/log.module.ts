import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogProvider } from './log.provider';
import { Log } from './models/log.model';
import { DatabaseModule } from '../../db/Database/database.module';
import { LogResolver } from './resolvers/log.resolver';


@Module( {
  imports: [ DatabaseModule ],
  controllers: [],
  providers: [ LogService, LogResolver, ...LogProvider, Log ],
  exports: [ LogService ],
} )
export class LogModule { }
