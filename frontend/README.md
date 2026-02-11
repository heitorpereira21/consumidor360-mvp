This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Banco de dados (PostgreSQL + Prisma)

Este MVP agora usa **PostgreSQL** com **Prisma** para persistir:

- usuários (cadastro/login)
- casos enviados para orientação
- orientações geradas (OpenAI ou fallback)

### 1) Variáveis de ambiente

Crie `frontend/.env.local` baseado em `frontend/.env.example`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
OPENAI_API_KEY="sua-chave-openai"
```

### 2) Instalar dependências

```bash
npm install
```

### 3) Gerar cliente Prisma e rodar migrações

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4) Executar o projeto

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
