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
          <h1 className="text-xl font-semibold text-gray-900">
            Orientação inicial ao consumidor
          </h1>

          <h2 className="text-base font-medium text-gray-800">
            Análise preliminar da situação apresentada
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Informe, de forma objetiva, os fatos relacionados ao problema enfrentado.
            O Consumidor 360 realizará uma análise inicial e indicará
            as possíveis providências cabíveis.
          </p>

          <p className="text-sm text-gray-500">
            As informações fornecidas serão utilizadas exclusivamente
            para fins de orientação preliminar.
          </p>


          <ProblemForm />
        </div>
      </main>
    </div>
  );
}
