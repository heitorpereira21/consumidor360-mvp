This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuração MongoDB Atlas (MVP)

As rotas de autenticação (`/api/register` e `/api/login`) usam o **MongoDB Atlas Data API**.

### 1) Criar Data API no Atlas

1. No Atlas, abra seu projeto e habilite o **Data API**.
2. Copie o endpoint no formato:
   - `https://<region>.aws.data.mongodb-api.com/app/<app-id>/endpoint/data/v1`

### 2) Configurar variáveis de ambiente

Crie `frontend/.env.local` usando `frontend/.env.example` como base:

```bash
MONGODB_DATA_API_URL=https://<region>.aws.data.mongodb-api.com/app/<seu-app-id>/endpoint/data/v1

# autenticação recomendada
MONGODB_DATA_API_KEY=<sua-chave-da-data-api>

# alternativa opcional
# MONGODB_DATA_API_BEARER_TOKEN=<seu-bearer-token>

MONGODB_DATABASE=consumidor360
MONGODB_USERS_COLLECTION=users
MONGODB_DATA_SOURCE=Cluster0
```

> Recomendado usar `MONGODB_DATA_API_KEY`; se preferir, use `MONGODB_DATA_API_BEARER_TOKEN`.

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
