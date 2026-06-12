# backendEmoCentro

API para gerenciamento de hemocentros e agendamentos de doação de sangue. Este projeto foi desenvolvido em Node.js com TypeScript e utiliza MongoDB para persistência de dados.

**Frontend:** [frontend-emo-centro.vercel.app](https://frontend-emo-centro.vercel.app/)

## 🚀 Tecnologias

- **Node.js** & **Express**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **JWT** (JSON Web Token) para Autenticação
- **Dotenv** para variáveis de ambiente
- **CORS** habilitado para integração com frontend

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── config/       # Configurações de banco de dados
│   ├── controllers/  # Lógica de negócio por recurso
│   ├── middlewares/  # Filtros de requisição (ex: Autenticação)
│   ├── models/       # Schemas e Modelos do Mongoose
│   ├── routes/       # Definição das rotas da API
│   ├── utils/        # Utilitários (Logger, etc.)
│   └── index.ts      # Ponto de entrada da aplicação
├── dist/             # Código compilado (gerado após build)
├── logs/             # Histórico de logs (opcional)
└── .env              # Variáveis de ambiente (sensível)
```

## 🛠️ Instalação e Setup

1.  **Clone o repositório e instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configuração das Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/emocentro
    JWT_SECRET=sua_chave_secreta_aqui
    NODE_ENV=development
    ```

3.  **Scripts Disponíveis:**
    - `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
    - `npm run build`: Compila o projeto TypeScript para JavaScript na pasta `dist/`.
    - `npm start`: Inicia o servidor a partir dos arquivos compilados (requer `npm run build` prévio).

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register`: Cria um novo usuário.
- `POST /api/auth/login`: Autentica um usuário e retorna um token JWT.

### Hemocentros
- `GET /api/hemocentros`: Lista todos os hemocentros (público).
- `POST /api/hemocentros`: Cadastra um novo hemocentro (requer autenticação).

### Agendamentos
- `GET /api/agendamentos`: Lista os agendamentos. Pode filtrar por e-mail via query param: `?userEmail=teste@teste.com`.
- `POST /api/agendamentos`: Cria um novo agendamento. Requer `userEmail` no corpo da requisição.
- `PUT /api/agendamentos/:id`: Atualiza data/horário de um agendamento.
- `DELETE /api/agendamentos/:id`: Remove um agendamento.

## 🔐 Autenticação (Simplificada)

A autenticação JWT foi removida para simplificação. A identificação do usuário nos agendamentos agora é feita via campo `userEmail` enviado diretamente nas requisições.

## 📝 Logging

Os logs da aplicação são exibidos em tempo real no terminal com cores para facilitar a distinção entre mensagens informativas (`INFO`) e erros (`ERROR`).

---
Desenvolvido para fins acadêmicos