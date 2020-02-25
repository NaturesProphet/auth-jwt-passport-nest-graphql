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

  @Field()
  @Column()
  name: string;

  @Field()
  @Column( { name: 'playerId', default: 'UNKNOWN PLAYER ID' } )
  playerId: string;

  @Field()
  @Column( { type: 'date' } )
  birthDay: Date;

  @Field()
  @Column()
  @Index( { unique: true } )
  email: string;

  @Field()
  @Column()
  @Index( { unique: true } )
  cpf: string;

  @Field()
  @Column()
  @Index( { unique: true } )
  phone: string;

  @Column( { select: false } )
  private passwordHash: string;

  @Field()
  @Column( {
    type: "enum",
    enum: enumUserStatus,
    default: 'pendent'
  } )
  status: string;

  @Field()
  @Column( { nullable: true } )
  profilePicturePath: string;

  @Field()
  @Column( { nullable: true, select: false } )
  emailVerificationCode: string;

  // usado pelo mecanismo de autenticação
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
