import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from 'type-graphql';


@ObjectType()
export abstract class GenericEntity {
  @Field()
  @PrimaryGeneratedColumn( { type: 'int' } )
  id: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}
