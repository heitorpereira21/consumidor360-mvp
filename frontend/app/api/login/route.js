import { findUserByEmail } from "../../../lib/mongodb";
import { verifyPassword } from "../../../lib/password";

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
      return Response.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);

    if (!user || !verifyPassword(senha, user.senhaHash)) {
      return Response.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    return Response.json({
      message: "Login ok",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return Response.json(
      { error: "Não foi possível realizar login" },
      { status: 500 }
    );
  }
}
