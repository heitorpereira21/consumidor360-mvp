import ProblemForm from "../components/ProblemForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-50">
      
      {/* Barra superior */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button className="text-xl">☰</button>

        <img
          src="/logo.png"
          alt="Consumidor 360"
          className="h-8 object-contain"
        />

        <div className="w-6 h-6 rounded-full bg-gray-300" />
      </header>

      {/* Conteúdo */}
      <main className="flex justify-center p-4">
        <div className="bg-white max-w-xl w-full rounded-xl shadow-md p-6 space-y-4 mt-6">
          <p className="text-gray-700">
            Está com um problema e não sabe como resolver?
            O Cidadão 360 te ajuda a entender sua situação
            e aponta o próximo passo de forma simples.
          </p>

          <p className="text-gray-600 text-sm">
            Responda algumas perguntas rápidas abaixo
            para receber uma orientação inicial.
          </p>

          <ProblemForm />
        </div>
      </main>
    </div>
  );
}
