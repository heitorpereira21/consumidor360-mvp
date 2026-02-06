export default function EmbaixadoresPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold mt-10 mb-4">
          Programa de Embaixadores
        </h1>
        <p className="text-gray-600 mt-2">
          Conectamos pessoas que desejam promover o acesso à orientação jurídica.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            O que é?
          </h2>
          <p className="text-gray-600 text-sm">
            O programa permite que você indique o Consumidor 360 e ajude mais
            pessoas a terem acesso à orientação inicial.
          </p>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Benefícios
          </h2>
          <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
            <li>Reconhecimento na comunidade</li>
            <li>Acesso antecipado a novidades</li>
            <li>Possíveis recompensas futuras</li>
          </ul>
        </div>

      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Quer participar?
        </h2>

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition">
          Quero ser embaixador
        </button>
      </div>

    </div>
  );
}
