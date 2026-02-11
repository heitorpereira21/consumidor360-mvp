import { createUser, findUserByEmail } from "../../../lib/db";
import { hashPassword } from "../../../lib/password";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email);
    const senha = String(body?.senha || "").trim();

    if (!email || !senha) {
      return Response.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return Response.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const passwordHash = hashPassword(senha);
    await createUser({ email, passwordHash });

    return Response.json({ message: "Usuário criado" });
  } catch (error) {
    if (error?.code === "P2002") {
      return Response.json({ error: "Usuário já existe" }, { status: 400 });
    }

    console.error("Erro ao registrar usuário:", error);
    return Response.json({ error: "Não foi possível criar o usuário" }, { status: 500 });
  }
}
