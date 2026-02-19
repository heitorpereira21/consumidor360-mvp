"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "../../lib/session";

export default function CadastroPage() {
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

  async function handleCadastro(e) {
    e.preventDefault();
    setErro("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErro(data.error || "Não foi possível concluir o cadastro.");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white p-6">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 py-8 md:grid-cols-2">
        <section className="hidden md:block">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Crie sua conta
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-gray-900">
            Salve seus casos e acompanhe seu histórico
          </h1>
          <p className="mt-4 max-w-md text-gray-600">
            Com uma conta gratuita, você pode retomar orientações, revisar passos e manter organização dos seus casos.
          </p>
        </section>

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900">Criar conta</h2>
          <p className="mt-1 text-sm text-gray-600">Leva menos de 1 minuto.</p>

          <form onSubmit={handleCadastro} className="mt-6 space-y-4" noValidate>
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
                autoComplete="new-password"
                placeholder="Crie uma senha"
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
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
