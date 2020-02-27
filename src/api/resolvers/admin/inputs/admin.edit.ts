import { Field, InputType } from 'type-graphql';

@InputType()
export class AdminEditInput {

  @Field()
  id: number;

  @Field( {
    nullable: true
  } )
  name: string;

  @Field( {
    nullable: true
  } )
  birthDay: Date;

  @Field( {
    nullable: true
  } )
  email: string;

  @Field( {
    nullable: true
  } )
  cpf: string;

  @Field( {
    nullable: true
  } )
  phone: string;

  @Field( {
    nullable: true
  } )
  password: string;

  @Field( {
    nullable: true
  } )
  status: string;

}
