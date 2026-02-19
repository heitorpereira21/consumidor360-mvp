"use client";

import { useRouter } from "next/navigation";

const highlights = [
  {
    title: "Em até 2 minutos",
    description: "Fluxo guiado e simples, sem juridiquês.",
  },
  {
    title: "Linguagem humana",
    description: "Você entende o que fazer no próximo passo.",
  },
  {
    title: "Privacidade e controle",
    description: "Você decide se quer salvar o caso na sua área.",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-14 py-10 md:py-14">
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-12 text-center shadow-sm md:px-14 md:py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Orientação inicial para consumidor
          </span>

          <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-6xl">
            Resolva sua dúvida com
            <span className="block bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              clareza e segurança
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-700 md:text-lg">
            Descreva seu caso e receba uma orientação prática sobre o que fazer agora.
            Sem complicação, com foco no próximo passo ideal.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-3 sm:flex-row">
            <button
              onClick={() => router.push("/orientacao")}
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              type="button"
            >
              Iniciar orientação gratuita
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              type="button"
            >
              Acessar minha área
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Principais benefícios">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Como funciona</h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Um processo objetivo para você sair da incerteza e avançar com confiança.
            </p>
          </div>
          <span className="hidden rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 md:inline-flex">
            Fluxo guiado
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Conte o que aconteceu", "Selecione a área e descreva sua situação em linguagem simples."],
            ["2", "Receba orientação inicial", "O sistema identifica o cenário e sugere próximos passos comuns."],
            ["3", "Acompanhe sua evolução", "Crie conta para guardar histórico e retomar quando quiser."],
          ].map(([step, title, description]) => (
            <article key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {step}
              </span>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
