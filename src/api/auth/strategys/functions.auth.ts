import { AuthenticatedUser } from "../DTOs/authenticatedUser.class";
import { ForbiddenException } from "@nestjs/common";
import { permissionFilter } from "../../../common/utils.util";


export function adminOnly ( user: AuthenticatedUser, operation: string, feature: string ) {
  if ( user.accountType != 'admin' ) {
    throw new ForbiddenException( 'Recurso disponível apenas para administradores' );
  }
  if ( operation && feature ) {
    permissionFilter( user, operation, feature );
  }
}

