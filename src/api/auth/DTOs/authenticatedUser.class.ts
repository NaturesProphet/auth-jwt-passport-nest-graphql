import { Role } from "../../../db/models/role.model";

export class AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  status: string;
  role?: Role
}
