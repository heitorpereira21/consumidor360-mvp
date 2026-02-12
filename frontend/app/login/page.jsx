"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser, saveStoredUser } from "../../lib/session";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();

    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.error || "Não foi possível entrar com seus dados.");
      return;
    }

    saveStoredUser(data.user);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-2 text-gray-900">Entrar na sua conta</h1>
        <p className="text-sm text-gray-600 mb-6">Acesse para salvar e acompanhar seus casos.</p>

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nome@exemplo.com"
              className="w-full rounded-md text-gray-800 border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-800">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Sua senha"
              className="w-full rounded-md text-gray-800 border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p role="alert" aria-live="polite" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Não tem conta?{" "}
          <button
            onClick={() => router.push("/cadastro")}
            className="text-blue-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
