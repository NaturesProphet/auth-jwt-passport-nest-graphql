import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, AfterLoad } from "typeorm";
import { ObjectType, Field } from 'type-graphql';
import { subHours, format } from 'date-fns';

@ObjectType( {
  description: 'Entidade genérica abastrata. todas as classes erdam dela.'
} )
export abstract class GenericEntity {
  @AfterLoad()
  formatDates () {
    let createdDate = new Date( this.createdAt );
    let updatedDate = new Date( this.updatedAt );
    createdDate = subHours( createdDate, 3 );
    updatedDate = subHours( updatedDate, 3 );

    this.createdAt = format( createdDate, 'dd/MM/yyyy HH:mm:ss' );
    this.updatedAt = format( updatedDate, 'dd/MM/yyyy HH:mm:ss' );
  }

  @Field( {
    description: 'ID da entidade'
  } )
  @PrimaryGeneratedColumn( { type: 'int' } )
  id: number;

  @Field( {
    description: 'data de criação do registro'
  } )
  @CreateDateColumn()
  createdAt: string;

  @Field( {
    description: 'data da ultima atualização do registro'
  } )
  @UpdateDateColumn()
  updatedAt: string;

}

