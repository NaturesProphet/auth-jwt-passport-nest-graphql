import { Entity, Column } from "typeorm";
import { GenericEntity } from "../../../db/models/super/genericEntity.model";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType( {
  description: 'Registro de todas as requisições atendidas pelo serviço'
} )
export class Log extends GenericEntity {
  @Column()
  @Field( {
    description: 'rota da API que originou o log'
  } )
  endpoint: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'conteúdo do corpo da requisição',
    nullable: true
  } )
  body: string;

  @Column( { nullable: true } )
  @Field( {
    nullable: true
  } )
  variables: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'ID do usuário que gerou o log',
    nullable: true
  } )
  userId: number;

  @Column( { nullable: true } )
  @Field( {
    description: 'Tipo de conta do usuário que gerou o log',
    nullable: true
  } )
  accountType: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'IP da requisição que gerou o log',
    nullable: true
  } )
  ip: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'Dispositivo ou sistema que enviou a requisição',
    nullable: true
  } )
  userAgent: string;
}
