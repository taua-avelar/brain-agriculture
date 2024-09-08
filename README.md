# Projeto de Gerenciamento de Produtores Rurais

URL da Aplicação: https://brain-agriculture-irqf.onrender.com
A aplicação está sendo servida na nuvem através do serviço Render. Note que a primeira requisição pode demorar um pouco, pois o servidor pode estar em estado de hibernação para economizar recursos.

Este projeto é um serviço de gerenciamento de produtores rurais, desenvolvido usando NestJS e TypeORM. O serviço permite criar, atualizar, excluir e consultar informações sobre produtores rurais, além de fornecer dados para um dashboard.


## Instalação

### Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina.

### Clonando o Repositório

Clone o repositório com o comando:
```git clone git@github.com:taua-avelar/brain-agriculture.git```
```cd brain-agriculture```

### Instalando Dependências
Instale as dependências do projeto com:

```npm install```

### Configuração do Ambiente
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:


```
PORT=xxxx
DB_HOST=xxxxxx
DB_PORT=xxxx
DB_USERNAME=xxxxxxx
DB_PASSWORD=xxxxxxxx
DB_NAME=xxxxxx
```


## Executando o Serviço
Para iniciar o serviço em modo de desenvolvimento, use:
```npm run start:dev```

Para iniciar o serviço em modo de produção, primeiro faça o build do projeto e depois inicie o serviço:
```npm run build```
```npm run start:prod```

### Executando Testes
Para rodar todos os testes unitários, use:
```npm test```

Para rodar os testes em modo watch (observando alterações), use:
```npm run test:watch```

Para conferir a cobertura dos testes, use:
```npm run test:cov```

## Endpoints da API
---
### Encontrar um Produtor Rural por ID
**GET** ```/farmer/:id```

***Resposta:***
```
{
  "id": 1
  "document": "12345678901",
  "name": "Nome do Produtor",
  "farmName": "Nome da Fazenda",
  "city": "Cidade",
  "state": "SP",
  "totalArea": 100.5,
  "arableArea": 80.0,
  "vegetationArea": 20.5,
  "crops": ["café", "soja"]
}
```
---
### Criar um Novo Produtor Rural
**POST** ```/farmer/new```
Corpo da Requisição:
```
{
  "document": "12345678901",
  "name": "Nome do Produtor",
  "farmName": "Nome da Fazenda",
  "city": "Cidade",
  "state": "SP",
  "totalArea": 100.5,
  "arableArea": 80.0,
  "vegetationArea": 20.5,
  "crops": ["café", "soja"]
}
```
***Resposta:***
```
{
  "id": 1
  "document": "12345678901",
  "name": "Nome do Produtor",
  "farmName": "Nome da Fazenda",
  "city": "Cidade",
  "state": "SP",
  "totalArea": 100.5,
  "arableArea": 80.0,
  "vegetationArea": 20.5,
  "crops": ["café", "soja"]
}
```
---
### Atualizar um Produtor Rural
**PATCH** ```/farmer/:id```
Corpo da Requisição:
```
{
  "name": "Nome Atualizado"
}
```
***Resposta:***
```
{
  "id": 1,
  "document": "12345678901",
  "name": "Nome Atualizado",
  "farmName": "Nome da Fazenda",
  "city": "Cidade",
  "state": "SP",
  "totalArea": 100.5,
  "arableArea": 80.0,
  "vegetationArea": 20.5,
  "crops": ["café", "soja"]
}
```

---
### Remover um Produtor Rural
**DELETE** ```/farmer/:id```

***Resposta:***
```
{
  "id": 1,
  "document": "12345678901",
  "name": "Nome do Produtor",
  "farmName": "Nome da Fazenda",
  "city": "Cidade",
  "state": "SP",
  "totalArea": 100.5,
  "arableArea": 80.0,
  "vegetationArea": 20.5,
  "crops": ["café", "soja"]
}
```
---
### Obter Dados do Dashboard
**GET** ```/farmer/dashboard```

***Resposta:***
```
{
  "totalFarmsCount": 10,
  "totalFarmsArea": 1000.0,
  "farmsByState": [
    { "state": "SP", "count": 5 },
    { "state": "MG", "count": 3 }
  ],
  "farmsByCrops": [
    { "crop": "café", "count": 6 },
    { "crop": "soja", "count": 4 }
  ],
  "farmsByLandUse": {
    "arableArea": 800.0,
    "vegetationArea": 200.0
  }
}
```
