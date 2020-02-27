import { Entity, Column, Index, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./permission.model";
import { GenericEntity } from "./super/genericEntity.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Role extends GenericEntity {
  @Field( {
    description: 'Nome da role'
  } )
  @Column()
  @Index( { unique: true } )
  name: string;


  @Field( {
    description: 'descrição da nova role'
  } )
  @Column( { type: "text", nullable: true } )
  description: string;


  @Field( type => Array( Permission ), {
    nullable: true,
    description: 'Lista de permissões da role.'
  } )
  @ManyToMany( type => Permission, permission => permission.roles )
  @JoinTable( {
    name: 'roles_permissions',
    joinColumns: [ { name: 'role_id' } ],
    inverseJoinColumns: [ { name: 'permission_id' } ]
  } )
  permissions: Permission[];
}
