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
        let p5 = new Permission();
        p5.id = 5;
        p5.operation = 'list';
        p5.feature = 'log';
        p5 = await connection.getRepository( Permission ).save( p5 );
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
        r1.permissions = [ p1, p2, p3, p4, p5 ];
        r1.name = "Master"
        r1.description = "Role Master padrão. Concede todas as permissões.";
        r1 = await connection.getRepository( Role ).save( r1 );
        ///////////////////////////////////////////////////////////
        let r2 = new Role();
        r2.id = 2;
        r2.permissions = [ p1, p5 ];
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
