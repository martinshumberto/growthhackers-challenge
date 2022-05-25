# GrowthHackers Challenge

Neste desafio você precisa criar uma API com CRUD e exportação/importação.
A API deve exibir para o usuário todas as fontes (categorias) de produtos disponíveis.
Os acessos a esses produtos devem estar disponíveis em um padrão típico de CRUD,
permitindo o cadastro de novos produtos. A listagem de produtos pode ser exportada e
importada dentro de uma categoria diferente.

## Features

- Produtos
  - Criar
  - Editar
  - Atualizar
  - Deletar
  - Importar (Filtro: Categoria)
  - Exportar (Filtro: Categoria)
- Categorias
  - Criar
  - Editar
  - Atualizar
  - Deletar

## Stack utilizada

    - ReactJS
    - TailwindCSS
    - NestJS (Node)
    - Docker / Docker Compose

## Rodando em desenvolvimento

Clone o projeto

```bash
  git clone https://github.com/martinshumberto/growthhackers-challenge
```

Entre no diretório do projeto

```bash
  cd growthhackers-challenge
```

Rode os containers

```bash
  make dev
```

## Deploy

Para fazer o deploy desse projeto para Heroku, rode a seguinte sequência de comandos:

- Logue-se na Heroku:

```bash
  heroku login
```

- Crie os aplicativos:

```bash
  heroku create -a example-web
  heroku create -a example-api
```

- Adicionado os remotes do repositório Heroku:

```bash
  git remote add heroku-web https://git.heroku.com/example-web.git
  git remote add heroku-server https://git.heroku.com/example-api.git
```

- Deploy dos packages para a Heroku:

```bash
  yarn deploy
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando:

```bash
  yarn test
```

## Documentação API

[Documentação](https://github.com/martinshumberto/growthhackers-challenge/tree/master/doc)

## Autor

- [@martinshumberto](https://www.linkedin.com/in/martinshumberto)
