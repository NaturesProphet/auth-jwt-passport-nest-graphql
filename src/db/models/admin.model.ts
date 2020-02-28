import { Entity, ManyToOne, JoinColumn, AfterLoad } from "typeorm";
import { GenericUser } from "./super/genericUser.model";
import { Role } from "./role.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType( {
  description: 'Administrador do sistema'
} )
@Entity()
export class Admin extends GenericUser {

  @Field( type => Role, {
    nullable: true,
    description: 'Role do administrador'
  } )
  @ManyToOne( type => Role )
  @JoinColumn( { name: 'role_id' } )
  role: Role

}
