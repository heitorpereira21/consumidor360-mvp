import ProblemForm from "../../components/ProblemForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-8">
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 lg:grid-cols-[1.4fr_0.9fr] lg:px-6">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <header className="space-y-3">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Etapa de orientação
            </span>
            <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Orientação inicial ao consumidor
            </h1>
            <p className="text-sm leading-6 text-gray-700 md:text-base">
              Informe os fatos de forma objetiva. Em poucos passos, você recebe uma
              orientação preliminar clara sobre o que fazer agora.
            </p>
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800 md:text-sm">
              Esta análise é informativa e não substitui atendimento jurídico profissional.
            </p>
          </header>

          <div className="mt-8">
            <ProblemForm />
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">Dicas para preencher melhor</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
            <li>• Descreva fatos em ordem cronológica.</li>
            <li>• Informe datas, valores e tentativas de contato.</li>
            <li>• Evite abreviações para facilitar a análise.</li>
            <li>• Se tiver urgência, sinalize no campo apropriado.</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
