export default function ResultCard({ result, cta }) {
  if (!result) return null;

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
    </div>
  );
}
