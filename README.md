# NodeJS Vanilla API
Este é um projeto de estudos que visa o desenvolvimento de uma API REST em NodeJS usando apenas recursos nativos, onde eu crio o mecanismo de roteamento, endpoints, mantendo a API segura. A ideia principal é tornar a API independente de frameworks, bibliotecas externas, garantir a performance, regras e segurança, implementando código nativo, criando mecanismos robustos e de forma simples aplicando conceitos de código e arquitetura limpa.

[![My Skills](https://skillicons.dev/icons?i=javascript,typescript,nodejs,npm,jest,docker,postman)](https://skillicons.dev)

Usando Typescript eu desenvolvi um mecanismo de roteamento capaz de aplicar regras como CORS, e proteções no cabeçalho de requisições HTTP, evitando diversos tipos de falhas e aberturas.

## TESTES
Usando Jest eu desenvolvi testes unitários para validar usecases e testes de integrações para validar minhas APIs. Você pode executar os testes acessando a raiz do projeto e executando os seguintes comandos:

Para instalar as bibliotecas necessárias:
```shell
npm install
```

Para executar os testes:
```shell
npm test
```

## EXECUÇÃO

Crie o arquivo **.env** na raiz do projeto para definir a variavel de ambiente responsável pela porta da aplicação, ou apenas renomeie o arquivo **.env.exampl**" para **.env**. Por exemplo:

```.env
PORT=3000
```

Ela usa a mesma porta definida no **Dockerfile** com o **EXPOSE**, caso deseje alterar atente-se aos dois arquivos.

Com o Docker eu encapsulei minha aplicação em um container, você pode executa-lo acessando a raiz do projeto e rodando os seguintes comandos:
```shell
docker build -t node_js_api .
```
```shell
docker run -p 3000:3000 node_js_api
```

Para validar se o servidor esta de pé você pode acessar a porta padrão da aplicação, seu resultade deverá ser como este:
```json
{
    "status": 200,
    "data": "I'am Vanilla JS Server!"
}
```

## POSTMAN
Na raiz do projeto existe uma collection do Postman, onde você pode importar e realizar os testes na API através do client do mesmo.
