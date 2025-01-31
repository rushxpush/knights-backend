# Knights Challenge - Backend

[Tecnologias](#tecnologias) | [Funcionalidades](#funcionalidades) | [Descrição](#descrição) | [Instalação](#instalação) | [Suporte](#suporte)

## Tecnologias

<ul>
  <li>NodeJs</li>
  <li>NestJs</li>
  <li>MongoDB</li>
</ul>

[Ir para o topo](#knights-challenge---backend)

## Funcionalidades

- &check; Configuração do Mongoose
- &check; CRUD da rota /knights
- &check; Lógica para salvar knights deletados na coleção *heros*
- &check; Adicionar parametro filter=heroes para rota /knight
- &check; Criar cálculos de 'Attack' e 'Experience' 
- &check; Adicionar exception handlers ao KnightsService
- &check; Dockerizar aplicação
- &check; Testes unitários - KnightsController
- &check; Testes unitários - KnightsService
- &check; Testes unitários - HeroesService
- &check; Testes unitários - KnightsCalculationProvider
- &#x2610; Documentar rotas com swagger
- &#x2610; Refatorar os stubs. Estão um pouco confusos e tem duplicatas 
- &#x2610; Testes e2e
- &#x2610; Aplicar os tipos do Typescript em todas as funções e variáveis que faltam


[Ir para o topo](#knights-challenge---backend)

## Descrição  

Este se trata do backend de um desafio de programação que fiz para uma vaga de emprego. Infelizmente não tive tempo de implementar todos o testes unitários, mas em geral acredito que o backend ficou legal. Não me atentei em colocar 100% todos os tipos nas variáveis, funções e classes. Foquei principalmente em deixar o app funcional, como um mvp. Faltou colocar o swagger para as rotas também. 

O backend cuida principalmente de quatro funcionalidades principais. A criação de knights, o update do seu apelido, a remoção do banco e a criação de heróis a partir dos heróis removidos. A lógica mais "complicadinha" seria realizar o cáculo de experiência e ataque com base numa fórmula que leva em conta atributos principais do personagem, poder da arma e idade. 

**Importante**: Se você der um refresh na rota /list, vai dar erro na página. Ainda não configurei o servidor para dar suporte ao Vue Router. Desculpe pelo inconveniente.

[Ir para o topo](#knights-challenge---backend)

## Instalação

1. Faça um clone do repositório:
```bash
git clone git@github.com:rushxpush/knights-backend.git
cd knights-backend
```

2. Monte a imagem e rode:
```bash
docker compose up --build
```

3. Não esqueça de montar a imagem do backend e rodar. Link: [knights-challenge-frontend](https://github.com/rushxpush/knights-frontend)

4. Acesse a página em [localhost:3000](http://localhost:3000)

5. Para rodar apenas os testes:
```bash
docker compose --profile test up
```

[Ir para o topo](#knights-challenge---backend)

## Suporte

Qualquer dúvida mande um email para [rafagarciadev@gmail.com](mailto:rafagarciadev@gmail.com)

[Ir para o topo](#knights-challenge---backend)
