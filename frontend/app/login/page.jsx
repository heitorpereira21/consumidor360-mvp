"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser, saveStoredUser } from "../../lib/session";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();

    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    saveStoredUser(data.user);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-6 text-gray-900">Entrar na sua conta</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Seu email"
            className="w-full rounded-md text-gray-800 border border-gray-300 px-3 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Sua senha"
            className="w-full rounded-md text-gray-800 border border-gray-300 px-3 py-3"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Não tem conta?{" "}
          <button
            onClick={() => router.push("/cadastro")}
            className="text-blue-600 font-medium hover:underline"
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
