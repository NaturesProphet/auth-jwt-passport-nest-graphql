import { Args, Query, Resolver } from '@nestjs/graphql';
import { LogService } from '../log.service';
import { Log } from '../models/log.model';
import { ReqGql, GqlUser } from '../../../api/auth/decorators/decorators';
import { listLogsQuery } from './DTOs/listLogs.query';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { LogInterceptor } from '../log.interceptor';
import { adminOnly } from '../../../api/auth/strategys/functions.auth';
import { GqlAuthGuard } from '../../../api/auth/guards/graphql-auth.guard';

@UseInterceptors( LogInterceptor )
@Resolver()
export class LogResolver {
  constructor( private readonly service: LogService ) { }

  @UseGuards( GqlAuthGuard )
  @Query( () => [ Log ] )
  public async logs ( @GqlUser() user, @ReqGql() req, @Args( 'query' ) query?: listLogsQuery ): Promise<Log[]> {
    adminOnly( user )
    return this.service.listLogs( req, query );
  }



}
