import { randomUUID } from "node:crypto";
import { users } from "./users";

const inMemoryCases = [];

let prismaClientPromise;
let prismaUnavailableReason;

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

async function getPrismaClient() {
  if (prismaClientPromise !== undefined) {
    return prismaClientPromise;
  }

  if (!process.env.DATABASE_URL) {
    prismaUnavailableReason = "DATABASE_URL não configurada";
    prismaClientPromise = null;
    return prismaClientPromise;
  }

  prismaClientPromise = (async () => {
    try {
      const dynamicImport = new Function("modulePath", "return import(modulePath);");
      const { PrismaClient } = await dynamicImport("@prisma/client");
      const globalForPrisma = globalThis;

      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
        });
      }

      return globalForPrisma.prisma;
    } catch (error) {
      prismaUnavailableReason = `Prisma indisponível: ${error?.message || "erro desconhecido"}`;
      return null;
    }
  })();

  return prismaClientPromise;
}

function warnFallbackOnce() {
  if (!prismaUnavailableReason) {
    return;
  }

  if (!globalThis._dbFallbackWarned) {
    console.warn(`Usando armazenamento em memória. Motivo: ${prismaUnavailableReason}`);
    globalThis._dbFallbackWarned = true;
  }
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const prisma = await getPrismaClient();

  if (prisma) {
    return prisma.user.findUnique({ where: { email: normalizedEmail } });
  }

  warnFallbackOnce();
  return users.find((user) => user.email === normalizedEmail) || null;
}

export async function createUser({ email, passwordHash }) {
  const normalizedEmail = normalizeEmail(email);
  const prisma = await getPrismaClient();

  if (prisma) {
    return prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
      },
    });
  }

  warnFallbackOnce();

  const existing = users.find((user) => user.email === normalizedEmail);
  if (existing) {
    const error = new Error("Unique constraint failed on email");
    error.code = "P2002";
    throw error;
  }

  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

export async function createCaseWithOrientation({ answers, orientacao, userEmail, model }) {
  const area = String(answers?.area || "").trim() || "Não informado";
  const description = String(answers?.description || "").trim() || "Não informado";
  const urgency = String(answers?.urgency || "").trim() || "Não informado";
  const prisma = await getPrismaClient();

  if (prisma) {
    const user = userEmail ? await findUserByEmail(userEmail) : null;

    return prisma.case.create({
      data: {
        area,
        description,
        urgency,
        userId: user?.id || null,
        orientations: {
          create: {
            title: String(orientacao?.titulo || "Orientação Jurídica"),
            text: String(orientacao?.texto || ""),
            action: String(orientacao?.acao || "Salvar caso"),
            model: String(model || "fallback"),
          },
        },
      },
      include: {
        orientations: true,
      },
    });
  }

  warnFallbackOnce();

  const user = userEmail ? users.find((entry) => entry.email === normalizeEmail(userEmail)) : null;
  const record = {
    id: randomUUID(),
    area,
    description,
    urgency,
    createdAt: new Date().toISOString(),
    userId: user?.id || null,
    orientations: [
      {
        id: randomUUID(),
        title: String(orientacao?.titulo || "Orientação Jurídica"),
        text: String(orientacao?.texto || ""),
        action: String(orientacao?.acao || "Salvar caso"),
        model: String(model || "fallback"),
        createdAt: new Date().toISOString(),
      },
    ],
  };

  inMemoryCases.push(record);
  return record;
}
