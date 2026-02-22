export default function ResultCard({ result, cta }) {
  if (!result) return null;

  const proconUrl = "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor";

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="text-base font-semibold text-gray-900">
        {result.titulo}
      </h3>

      <p className="mt-2 text-sm text-gray-700">
        {result.texto}
      </p>

      {cta ? (
        <a
          href={cta}
          className="mt-4 inline-block w-full rounded-md bg-blue-600 px-4 py-2 text-white text-center hover:bg-blue-700 transition"
        >
          {result.acao || "Ir para Login"}
        </a>
      ) : (
        <button className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {result.acao}
        </button>
      )}

      <a
        href={proconUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block w-full rounded-md border border-blue-300 bg-white px-4 py-2 text-center text-blue-700 hover:bg-blue-50 transition"
      >
        Acessar site do PROCON
      </a>
    </div>
  );
}
