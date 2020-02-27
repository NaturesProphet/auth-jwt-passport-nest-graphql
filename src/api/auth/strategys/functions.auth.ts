import { AuthenticatedUser } from "../DTOs/authenticatedUser.class";
import { ForbiddenException } from "@nestjs/common";

export function adminOnly ( user: AuthenticatedUser ) {
  if ( user.accountType != 'admin' ) {
    throw new ForbiddenException( 'Recurso disponível apenas para administradores' );
  }
}

