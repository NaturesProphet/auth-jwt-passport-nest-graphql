import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../db/Database/database.module';
import { AdminService } from '../services/admin.service';
import { AdminProviders } from '../providers/admin.providers';
import { AdminResolver } from '../resolvers/admin/admin.resolver';
import { PermissionService } from '../services/permission.service';
import { PermissionResolver } from '../resolvers/permission/permission.resolver';
import { RoleService } from '../services/role.service';
import { RoleResolver } from '../resolvers/role/role.resolver';


@Module( {
  imports: [ DatabaseModule ],

  providers: [ AdminService, AdminResolver,
    PermissionService, PermissionResolver,
    RoleService, RoleResolver,
    ...AdminProviders ],

} )
export class AdminModule { }
