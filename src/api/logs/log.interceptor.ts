import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Log } from './models/log.model';
import { getConnection } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept ( context: ExecutionContext, next: CallHandler ): Observable<any> {
    return next
      .handle()
      .pipe(
        tap( () => {
          const ctx = GqlExecutionContext.create( context ).getContext();
          let req = ctx.req;
          generateLog( req );
        } ),
      );
  }
}

function generateLog ( req: any ) {
  //removePasswords( req );
  try {
    let log: Log = new Log();
    log.body = JSON.stringify( req.body );
    log.endpoint = req.originalUrl;
    log.ip = req.ip;
    log.variables = req.variables ? JSON.stringify( req.variables ) : null;
    if ( req.user && req.user.id ) {
      log.userId = req.user.id;
      log.accountType = req.user.accountType;
    }
    log.userAgent = req.headers[ "user-agent" ];
    getConnection().getRepository( Log ).save( log );
  } catch ( err ) {
    console.log( `Erro ao tentar salvar um log. ${err.message}\n` );
  }
}

function removePasswords ( req: any ) {
  if ( req && req.body && req.body.password ) {
    req.body.password = '***'
  }
}
