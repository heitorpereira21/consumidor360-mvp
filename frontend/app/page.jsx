"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="space-y-16">

      {/* Hero */}
      <section className="text-center space-y-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Orientação jurídica <br />
          <span className="text-blue-600">
            simples e acessível
          </span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Responda algumas perguntas e receba uma orientação inicial
          sobre seu caso em poucos minutos.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => router.push("/orientacao")}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Iniciar orientação
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-gray-100 px-6 py-3 text-gray-800 font-medium hover:bg-gray-200 transition border"
          >
            Minha área
          </button>
        </div>
      </section>

      {/* Como funciona */}
      <section className="grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            1. Responda
          </h3>
          <p className="text-gray-600 text-sm">
            Informe a área do problema e descreva o que aconteceu.
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            2. Receba orientação
          </h3>
          <p className="text-gray-600 text-sm">
            O sistema analisa e apresenta os próximos passos recomendados.
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            3. Salve seu caso
          </h3>
          <p className="text-gray-600 text-sm">
            Crie uma conta para acompanhar seus casos e histórico.
          </p>
        </div>

      </section>

      {/* CTA final */}
      <section className="bg-blue-600 rounded-xl text-white p-10 text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Pronto para começar?
        </h2>
        <p className="opacity-90">
          Leva menos de 2 minutos.
        </p>

        <button
          onClick={() => router.push("/orientacao")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Iniciar agora
        </button>
      </section>

    </div>
  );
}
