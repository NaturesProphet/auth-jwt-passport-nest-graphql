import { MigrationInterface, QueryRunner, getConnection } from "typeorm";
import { Permission } from "../models/permission.model";
import { Role } from "../models/role.model";
import { Admin } from "../models/admin.model";
import { Logger } from "@nestjs/common";

export class CreatePermissions1582659565421 implements MigrationInterface {

    public async up ( queryRunner: QueryRunner ): Promise<any> {
        let connection = getConnection();

        ///////////////////////////////////////////////////////////
        let p1 = new Permission();
        p1.id = 1;
        p1.operation = 'list';
        p1.feature = 'admin';
        p1 = await connection.getRepository( Permission ).save( p1 );
        ///////////////////////////////////////////////////////////
        let p2 = new Permission();
        p2.id = 2;
        p2.operation = 'edit';
        p2.feature = 'admin';
        p2 = await connection.getRepository( Permission ).save( p2 );
        ///////////////////////////////////////////////////////////
        let p3 = new Permission();
        p3.id = 3;
        p3.operation = 'delete';
        p3.feature = 'admin';
        p3 = await connection.getRepository( Permission ).save( p3 );
        ///////////////////////////////////////////////////////////
        let p4 = new Permission();
        p4.id = 4;
        p4.operation = 'create';
        p4.feature = 'admin';
        p4 = await connection.getRepository( Permission ).save( p4 );
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        let p5 = new Permission();
        p5.id = 5;
        p5.operation = 'list';
        p5.feature = 'log';
        p5 = await connection.getRepository( Permission ).save( p5 );
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        let p6 = new Permission();
        p6.id = 6;
        p6.operation = 'create';
        p6.feature = 'role';
        p6 = await connection.getRepository( Permission ).save( p6 );
        ///////////////////////////////////////////////////////////
        let p7 = new Permission();
        p7.id = 7;
        p7.operation = 'edit';
        p7.feature = 'role';
        p7 = await connection.getRepository( Permission ).save( p7 );
        ///////////////////////////////////////////////////////////
        let p8 = new Permission();
        p8.id = 8;
        p8.operation = 'list';
        p8.feature = 'role';
        p8 = await connection.getRepository( Permission ).save( p8 );
        ///////////////////////////////////////////////////////////
        let p9 = new Permission();
        p9.id = 9;
        p9.operation = 'delete';
        p9.feature = 'role';
        p9 = await connection.getRepository( Permission ).save( p9 );
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        let p10 = new Permission();
        p10.id = 10;
        p10.operation = 'create';
        p10.feature = 'permission';
        p10 = await connection.getRepository( Permission ).save( p10 );
        ///////////////////////////////////////////////////////////
        let p11 = new Permission();
        p11.id = 11;
        p11.operation = 'edit';
        p11.feature = 'permission';
        p11 = await connection.getRepository( Permission ).save( p11 );
        ///////////////////////////////////////////////////////////
        let p12 = new Permission();
        p12.id = 12;
        p12.operation = 'list';
        p12.feature = 'permission';
        p12 = await connection.getRepository( Permission ).save( p12 );
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        let r1 = new Role()
        r1.id = 1;
        r1.permissions = [ p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 ];
        r1.name = "Master"
        r1.description = "Role Master padrão. Concede todas as permissões.";
        r1 = await connection.getRepository( Role ).save( r1 );
        ///////////////////////////////////////////////////////////
        let r2 = new Role();
        r2.id = 2;
        r2.permissions = [ p1, p5, p8, p12 ];
        r2.name = "Auditoria"
        r2.description = "Role para auditoria, concede todos os direitos de visualização";
        r2 = await connection.getRepository( Role ).save( r2 );
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        let ad1 = new Admin();
        ad1.id = 1;
        ad1.birthDay = new Date();
        ad1.cpf = '12345678900';
        ad1.email = 'adminmaster@server.com'
        ad1.name = "Senhor dos anéis"
        ad1.phone = "+5527999999999"
        ad1.status = 'active';
        ad1.setPassword( '123456' );
        ad1.role = r1;
        ad1.profilePicturePath = 'https://avatars2.githubusercontent.com/u/32722732?s=460&v=4'
        await connection.getRepository( Admin ).save( ad1 );
        console.log( '\n\n\n' )

        Logger.log( 'Estrutura inicial gerada com sucesso. ' +
            'Lembre-se de mudar a senha do administrador!\n\n\n', 'MIGRATIONS' );
    }

    public async down ( queryRunner: QueryRunner ): Promise<any> {
    }

}
