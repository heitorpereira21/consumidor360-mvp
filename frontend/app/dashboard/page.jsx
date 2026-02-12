"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearStoredUser, getCasesForUser, getStoredUser } from "../../lib/session";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [casos, setCasos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(storedUser);
    setCasos(getCasesForUser(storedUser.email));
  }, [router]);

  function handleLogout() {
    clearStoredUser();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Minha Área</h1>

          <button
            onClick={handleLogout}
            className="text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
          >
            Sair
          </button>
        </div>

        {user && (
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <p className="text-sm text-gray-700">Logado como:</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
        )}

        <section className="space-y-4" aria-labelledby="meus-casos-titulo">
          <h2 id="meus-casos-titulo" className="text-lg font-semibold text-gray-900">
            Meus Casos
          </h2>

          {casos.length === 0 ? (
            <div className="bg-white rounded-lg border shadow-sm p-4 text-gray-700 space-y-3">
              <p>Você ainda não salvou nenhum caso.</p>
              <button
                onClick={() => router.push("/orientacao")}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Iniciar nova orientação
              </button>
            </div>
          ) : (
            casos.map((caso, index) => (
              <div key={caso.id || index} className="bg-white rounded-lg border shadow-sm p-4 space-y-2">
                <h3 className="font-medium text-gray-900">{caso.orientacao?.titulo}</h3>

                <p className="text-sm text-gray-700">Área: {caso.answers?.area}</p>

                <p className="text-sm text-gray-700">{caso.orientacao?.texto}</p>

                <p className="text-xs text-gray-600">{new Date(caso.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
