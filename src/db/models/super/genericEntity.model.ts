import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from 'type-graphql';


@ObjectType( {
  description: 'Entidade genérica abastrata. todas as classes erdam dela.'
} )
export abstract class GenericEntity {
  @Field( {
    description: 'ID da entidade'
  } )
  @PrimaryGeneratedColumn( { type: 'int' } )
  id: number;

  @Field( {
    description: 'data de criação do registro'
  } )
  @CreateDateColumn()
  createdAt: Date;

  @Field( {
    description: 'data da ultima atualização do registro'
  } )
  @UpdateDateColumn()
  updatedAt: Date;

}

