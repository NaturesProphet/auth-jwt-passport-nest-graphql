import { Entity, Column, Index, ManyToMany } from "typeorm";
import { Role } from "./role.model";
import { GenericEntity } from "./super/genericEntity.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
@Index( [ "operation", "feature" ], { unique: true } )
export class Permission extends GenericEntity {

  @Field()
  @Column()
  operation: string;


  @Field()
  @Column()
  feature: string;

  @ManyToMany( type => Role, role => role.permissions )
  roles: Role[];
}
