This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuração MongoDB Atlas (MVP)

As rotas de autenticação (`/api/register` e `/api/login`) usam o **driver oficial MongoDB Node.js** conectado ao Atlas.

### 1) Instalar dependência

```bash
npm install mongodb
```

### 2) Configurar variáveis de ambiente

Crie `frontend/.env.local` usando `frontend/.env.example` como base:

```bash
MONGODB_URI=mongodb+srv://hpereir4_db_user:<db_password>@consumidor360.83hhm1q.mongodb.net/?appName=consumidor360
MONGODB_DATABASE=consumidor360
MONGODB_USERS_COLLECTION=users
```

> Substitua `<db_password>` pela senha do usuário `hpereir4_db_user` e mantenha URL-encoding se houver caracteres especiais.

### 3) Estrutura de coleção recomendada

Coleção: `users`

Documento (exemplo):

```json
{
  "email": "usuario@exemplo.com",
  "senhaHash": "<hash gerado no backend>",
  "createdAt": "2026-01-01T12:00:00.000Z"
}
```

Recomendado criar índice único em `email` no Atlas para evitar duplicidade.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
