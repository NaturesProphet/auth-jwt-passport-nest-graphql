import { Entity, ManyToOne, JoinColumn, AfterLoad } from "typeorm";
import { GenericUser } from "./super/genericUser.model";
import { Role } from "./role.model";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Admin extends GenericUser {

  @Field( type => Role, { nullable: true } )
  @ManyToOne( type => Role )
  @JoinColumn( { name: 'role_id' } )
  role: Role

  @AfterLoad()
  setType () {
    this.accountType = 'admin';
  }
}
