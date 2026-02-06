"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  function handleCadastro(e) {
    e.preventDefault();

    localStorage.setItem(
      "consumidor360_user",
      JSON.stringify({ email })
    );

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg border shadow-sm p-6">

        <h1 className="text-xl font-semibold mb-6 text-gray-900">
          Criar conta
        </h1>

        <form onSubmit={handleCadastro} className="space-y-4">

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
            placeholder="Crie uma senha"
            className="w-full rounded-md text-gray-800 border border-gray-300 px-3 py-3"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Criar conta
          </button>

        </form>

      </div>
    </div>
  );
}
