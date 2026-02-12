import Link from "next/link";

export default function ResultCard({ result, cta }) {
  if (!result) return null;

  return (
    <section className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4" aria-labelledby="resultado-titulo">
      <h3 id="resultado-titulo" className="text-lg font-semibold text-gray-900">
        {result.titulo}
      </h3>

      <p className="mt-2 text-sm text-gray-800 leading-6">
        {result.texto}
      </p>

      {cta ? (
        <Link
          href={cta}
          className="mt-4 inline-block w-full rounded-md bg-blue-600 px-4 py-2 text-white text-center hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          {result.acao || "Ir para Login"}
        </Link>
      ) : (
        <button
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          type="button"
        >
          {result.acao}
        </button>
      )}
    </section>
  );
}
