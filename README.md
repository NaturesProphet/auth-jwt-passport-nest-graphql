<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   Uma aplicação desenvolvida em <a href="https://github.com/Microsoft/TypeScript">Typescript</a> usando <a href="http://nestjs.com/">Nestjs Framework</a>
</p>

# GraphQL com Nestjs utilizando autenticação JWT com Passport adaptado para o contexto GQL

Sistema base pré-ajustado para começar projetos em GraphQL utilizando o NestJs. Basta clonar o repositório e começar novos projetos com o código base já pronto!

## Permissões e grupos
Contas de administrador possuem uma role, que é formada por uma agregação de várias permissões, que definem quais recursos a conta poderá acessar dentro do sistema

## Configuração do ambiente
Crie um arquivo .env baseado no .env.example disponível na raíz do projeto.

## Iniciando a API em ambiente de desenvolvimento

### Instalação das dependencias
Instale as dependencias do projeto com seu package manager preferido (npm ou yarn). Utilizei yarn no exemplo.

```
yarn
```

### Banco de dados
Para a primeira inicialização, você precisará subir o banco de dados (postgre), gerar as tabelas e popular as tabelas de permissões, roles e administradores.

Para fazer isso, siga esta sequência:

### Subindo um banco em docker
Você pode usar o script do package.json pronto para a tarefa usando o Docker:
```
yarn postgre:test
```

### Gerar as tabelas
A api usa o TypeORM com opção de SYNC. Ou seja, ajuste o SYNC (arquivo .env) para true e inicie a API. Isto irá gerar automaticamente as tabelas.

```
yarn start
```

### Popular o banco com os primeiros dados críticos
Após ter iniciado a api uma vez, basta rodar um "migration" para popular as tabelas. Para isso, eu utilizei os migrations nativos do typeorm, adaptando para fazer seed em vez de migration.
O arquivo ormconfig.json será lido por esse comando a seguir, para configuração do banco que o comando deverá executar. Observe que a API não utiliza esse arquivo, apenas a migration.
Execute esse comando:

```
yarn migrations
```

Pronto! o sistema está pronto para uso!

### Autenticação
A rota de login é REST. Mantive essa rota em REST devido a uma série de restrições do modulo Passport, que vem pré-configurado para funcionar apenas no REST.

Utilizando um postman ou um insomnia, envie um POST para a rota

```
http://localhost:3000/auth/admin
```

Utilize uma das duas contas de administrador padrão no body:

```JSON
{
  "username":"adminmaster@server.com",
  "password":"123456"
}
```

ou 

```JSON
{
  "username":"auditoria@server.com",
  "password":"123456"
}
```

Copie o token fornecido na resposta.


## Playground GraphQL

Com o token gerado, agora já podemos utilziar todos os recursos da API.

Acesse a rota

```
http://localhost:3000/graphql
```


no canto esquerdo inferior, vá nos headers e adicione o token
```JSON
{
  "Authorization":"<Seu Token vai aqui>"
}
```

Pronto! agora você poderá utilziar a API.

Exemplos de requisições possíveis:

```
query permissions {
  listPermissions(query: { limit: 1000 }) {
    id
    operation
    feature
  }
}

query roles {
  listRoles(query: { limit: 10000 }) {
    id
    name
    permissions {
      id
    }
  }
}

query logs {
  listLogs(query: { limit: 1000 }) {
    id
  }
}

query admns {
  listAdmins(query: { limit: 10000 }) {
    id
    name
    email
    role {
      name
    }
  }
}

mutation createPermission {
  createPermission(data: { operation: "delete", feature: "log" }) {
    id
  }
}

mutation createRole {
  createRole(
    data: { name: "asd", description: "asd", permissions: [1, 2, 3] }
  ) {
    id
  }
}

mutation createAdmin {
  createAdmin(
    data: {
      name: "asd"
      birthDay: "2020-01-01"
      email: "asd@asd.asd"
      cpf: "1234123123"
      phone: "27988884444"
      password: "123456"
    }
  ) {
    id
  }
}

mutation editAdmin {
  editAdmin(data: { id: 2, birthDay: "2020-10-10" }) {
    id
  }
}

mutation editPermissionAdd {
  editRoleAddingPermissions(dto: { role: 2, permissions: [3, 4] }) {
    id
  }
}

mutation editPermissionRemove {
  editRoleRemovingPermissions(dto: { role: 2, permissions: [3, 4] }) {
    id
  }
}

```


## Debug
Após iniciar o Debug (F5), aguarde a mensagem "API pronta e ouvindo na porta 3000" no terminal do debugger antes de iniciar a sua depuração.
