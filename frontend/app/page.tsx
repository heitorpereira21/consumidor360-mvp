import ProblemForm from "../components/ProblemForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Cidadão 360
        </h1>

        <p className="text-gray-700">
          Está com um problema e não sabe por onde começar?
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
  );
}
