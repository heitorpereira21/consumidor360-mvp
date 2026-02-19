import Link from "next/link";

export default function ResultCard({ result, cta }) {
  if (!result) return null;

  return (
    <section
      className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white"
      aria-labelledby="resultado-titulo"
    >
      <div className="border-b border-emerald-100 px-5 py-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Resultado da análise preliminar</p>
        <h3 id="resultado-titulo" className="mt-2 text-lg font-semibold text-gray-900 md:text-xl">
          {result.titulo}
        </h3>
      </div>

      <div className="space-y-4 px-5 py-5 md:px-6">
        <p className="text-sm leading-6 text-gray-800 md:text-base">{result.texto}</p>

        {cta ? (
          <Link
            href={cta}
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white text-center hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            {result.acao || "Ir para login"}
          </Link>
        ) : (
          <button
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            type="button"
          >
            {result.acao}
          </button>
        )}
      </div>
    </section>
  );
}
