# Agenda Esportiva

Projeto acadêmico de CRUD para a disciplina de Experiência Criativa. O sistema permite cadastrar e organizar eventos esportivos usando React no frontend, Node.js com Express no backend e MySQL como banco de dados.

Nome do aluno: Rafael Calixto Maluf. O nome também aparece no cabeçalho do sistema, conforme solicitado na atividade.

## Tecnologias utilizadas

- React e Vite
- Node.js e Express
- MySQL
- Fetch para comunicação entre frontend e backend

## Estrutura do projeto

```text
exp cri/
├── backend/
│   ├── src/server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── banco.sql
└── README.md
```

## Requisitos

- Node.js 18 ou superior
- MySQL 8 ou superior

## Banco de dados

1. Abra o MySQL Workbench.
2. Abra o arquivo `banco.sql`.
3. Execute o script inteiro.

O arquivo cria o banco `agenda_esportiva`, a tabela `eventos_esportivos` e três registros de exemplo. Ele pode ser executado mais de uma vez sem duplicar esses registros iniciais.

## Configuração do backend

Na pasta `backend`, copie o arquivo `.env.example`, renomeie a cópia para `.env` e informe a senha do MySQL:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=agenda_esportiva
```

## Como executar

Abra dois terminais na pasta do projeto.

No primeiro, inicie o backend:

```bash
cd backend
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

No segundo, inicie o frontend:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Funcionalidades

- Listagem de eventos com paginação de três registros por página.
- Cadastro de eventos.
- Visualização detalhada de um evento.
- Edição de eventos existentes.
- Exclusão com confirmação.
- Validação dos campos no frontend e no backend.
- Mensagens de sucesso e de erro.

## Endpoints da API

- `GET /eventos?pagina=1`
- `GET /eventos/:id`
- `POST /eventos`
- `PUT /eventos/:id`
- `DELETE /eventos/:id`
