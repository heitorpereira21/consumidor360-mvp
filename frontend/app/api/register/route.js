import { users } from "../../../lib/users";

export async function POST(req) {
  const body = await req.json();
  const { email, senha } = body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return Response.json(
      { error: "Usuário já existe" },
      { status: 400 }
    );
  }

  users.push({ email, senha });

  return Response.json({ message: "Usuário criado" });
}
