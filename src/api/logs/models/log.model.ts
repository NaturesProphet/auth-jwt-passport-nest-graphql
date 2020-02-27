import { Entity, Column } from "typeorm";
import { GenericEntity } from "../../../db/models/super/genericEntity.model";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class Log extends GenericEntity {
  @Column()
  @Field()
  endpoint: string;

  @Column( { nullable: true } )
  @Field()
  body: string;

  @Column( { nullable: true } )
  @Field()
  variables: string;

  @Column( { nullable: true } )
  @Field()
  userId: number;

  @Column( { nullable: true } )
  @Field()
  accountType: string;

  @Column( { nullable: true } )
  @Field()
  ip: string;

  @Column( { nullable: true } )
  @Field()
  userAgent: string;
}
