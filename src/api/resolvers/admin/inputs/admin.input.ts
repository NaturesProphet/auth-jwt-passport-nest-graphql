import { Field, InputType } from 'type-graphql';

@InputType()
export class AdminInput {
  @Field( {
    nullable: true,
    description: "nome do administrador"
  } )
  name: string;

  @Field( {
    nullable: true,
    description: "aniversário administrador"
  } )
  birthDay: Date;

  @Field( {
    nullable: true,
    description: "email do administrador"
  } )
  email: string;

  @Field( {
    nullable: true,
    description: "CPF do administrador"
  } )
  cpf: string;

  @Field( {
    nullable: true,
    description: "telefone do administrador"
  } )
  phone: string;

  @Field( {
    nullable: true,
    description: "nova senha do administrador"
  } )
  password: string;

  @Field( {
    nullable: true,
    description: "status do administrador"
  } )
  status: string;

}
