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
- &#x2610; Testes unitários - HeroesService
- &#x2610; Testes unitários - KnightsCalculationProvider
- &#x2610; Testes e2e
- &#x2610; Aplicar os tipos do Typescript em todas as funções e variáveis que faltam


[Ir para o topo](#knights-challenge---backend)

## Descrição

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

4. Acesse a página em localhost:3000

5. Para rodar apenas os testes:
```bash
docker compose up test
```

[Ir para o topo](#knights-challenge---backend)

## Suporte

Qualquer dúvida mande um email para [rafagarciadev@gmail.com](mailto:rafagarciadev@gmail.com)

[Ir para o topo](#knights-challenge---backend)