import { prisma } from "./prisma";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  return prisma.user.findUnique({ where: { email: normalizedEmail } });
}

export async function createUser({ email, passwordHash }) {
  return prisma.user.create({
    data: {
      email: normalizeEmail(email),
      passwordHash,
    },
  });
}

export async function createCaseWithOrientation({ answers, orientacao, userEmail, model }) {
  const area = String(answers?.area || "").trim() || "Não informado";
  const description = String(answers?.description || "").trim() || "Não informado";
  const urgency = String(answers?.urgency || "").trim() || "Não informado";

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
