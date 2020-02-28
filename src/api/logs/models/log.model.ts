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
    description: 'conteúdo do corpo da requisição'
  } )
  body: string;

  @Column( { nullable: true } )
  @Field()
  variables: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'ID do usuário que gerou o log'
  } )
  userId: number;

  @Column( { nullable: true } )
  @Field( {
    description: 'Tipo de conta do usuário que gerou o log'
  } )
  accountType: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'IP da requisição que gerou o log'
  } )
  ip: string;

  @Column( { nullable: true } )
  @Field( {
    description: 'Dispositivo ou sistema que enviou a requisição'
  } )
  userAgent: string;
}
