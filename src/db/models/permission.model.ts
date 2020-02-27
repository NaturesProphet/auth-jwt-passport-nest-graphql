import { Entity, Column, Index, ManyToMany } from "typeorm";
import { Role } from "./role.model";
import { GenericEntity } from "./super/genericEntity.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
@Index( [ "operation", "feature" ], { unique: true } )
export class Permission extends GenericEntity {

  @Field( {
    description: 'operação. exemplos: edit, list, delete, create'
  } )
  @Column()
  operation: string;


  @Field( {
    description: 'recurso. exemplo: admin, log'
  } )
  @Column()
  feature: string;


  @ManyToMany( type => Role, role => role.permissions )
  roles: Role[];
}
