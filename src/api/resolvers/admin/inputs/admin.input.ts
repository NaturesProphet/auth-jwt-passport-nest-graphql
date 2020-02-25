import { Field, InputType } from 'type-graphql';

@InputType()
export class AdminInput {

  @Field()
  name: string;

  @Field()
  birthDay: Date;

  // @Field()
  // playerId: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  // @Field()
  // status: string;

}
