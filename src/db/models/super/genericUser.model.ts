import {
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, Column, Index, BeforeInsert
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import { enumUserStatus } from "../../../common/enums/userStatus.enum";
import { GenericEntity } from "./genericEntity.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class GenericUser extends GenericEntity {

  @BeforeInsert()
  padronize () {
    this.email = this.email.toLowerCase();
  }

  @Field( {
    description: 'Nome do usuário'
  } )
  @Column()
  name: string;

  @Field( {
    description: 'identificação do dispositivo para push notifications'
  } )
  @Column( { name: 'playerId', default: 'UNKNOWN PLAYER ID' } )
  playerId: string;

  @Field( {
    description: 'data de aniversário do usuário'
  } )
  @Column( { type: 'date' } )
  birthDay: Date;

  @Field( {
    description: 'email do usuário'
  } )
  @Column()
  @Index( { unique: true } )
  email: string;

  @Field( {
    description: 'cpf do usuário'
  } )
  @Column()
  @Index( { unique: true } )
  cpf: string;

  @Field( {
    description: 'telefone do usuário'
  } )
  @Column()
  @Index( { unique: true } )
  phone: string;

  @Column( { select: false } )
  private passwordHash: string;

  @Field( {
    description: 'status do usuário'
  } )
  @Column( {
    type: "enum",
    enum: enumUserStatus,
    default: 'pendent'
  } )
  status: string;

  @Field( {
    description: 'link com a imagem de perfil do usuário'
  } )
  @Column( { nullable: true } )
  profilePicturePath: string;

  @Field( {
    description: 'código de verificação utilizado pela API para validar emails'
  } )
  @Column( { nullable: true, select: false } )
  emailVerificationCode: string;

  // usado na autenticação apenas
  accountType: string;

  setPassword ( password: string ) {
    this.passwordHash = bcrypt.hashSync( password );
  }

  getPasswordHash () {
    return this.passwordHash;
  }

  setUp ( dto ) {
    this.name = dto.name;
    this.cpf = dto.cpf;
    this.birthDay = dto.birthDay;
    this.email = dto.email;
    this.phone = dto.phone;
    this.setPassword( dto.password );
    this.setStatus( 'pendent' );
    return this;
  }

  setStatus ( status: 'pendent' | 'active' | 'deleted' | 'suspended' ) {
    this.status = status;
  }

  getStatus () {
    return this.status;
  }

}
