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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white p-6">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 py-8 md:grid-cols-2">
        <section className="hidden md:block">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Bem-vindo de volta
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-gray-900">
            Entre para acompanhar seus casos com praticidade
          </h1>
          <p className="mt-4 max-w-md text-gray-600">
            Sua área reúne histórico, orientações e próximos passos para você continuar de onde parou.
          </p>
        </section>

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900">Entrar na sua conta</h2>
          <p className="mt-1 text-sm text-gray-600">Acesse para salvar e acompanhar seus casos.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4" noValidate>
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
                className="w-full rounded-xl text-gray-800 border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
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
                className="w-full rounded-xl text-gray-800 border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && (
              <p role="alert" aria-live="polite" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600 text-sm">
            Não tem conta?{" "}
            <button
              onClick={() => router.push("/cadastro")}
              className="text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
              type="button"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
