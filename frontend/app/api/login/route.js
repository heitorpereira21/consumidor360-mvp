import { users } from "../../../lib/users";

export async function POST(req) {
  const body = await req.json();
  const { email, senha } = body;

  const user = users.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) {
    return Response.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  return Response.json({ message: "Login ok", user });
}
