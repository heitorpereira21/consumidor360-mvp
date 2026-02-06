"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [casos, setCasos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("consumidor360_user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));

    const storedCasos =
      JSON.parse(localStorage.getItem("casos")) || [];

    setCasos(storedCasos);
  }, []);

  function handleLogout() {
    localStorage.removeItem("consumidor360_user");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Minha Área
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm text-blue-600 hover:underline"
          >
            Sair
          </button>
        </div>

        {/* Usuário */}
        {user && (
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <p className="text-sm text-gray-600">
              Logado como:
            </p>
            <p className="font-medium text-gray-900">
              {user.email}
            </p>
          </div>
        )}

        {/* Histórico */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Meus Casos
          </h2>

          {casos.length === 0 ? (
            <div className="bg-white rounded-lg border shadow-sm p-4 text-gray-600">
              Você ainda não salvou nenhum caso.
            </div>
          ) : (
            casos.map((caso, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border shadow-sm p-4 space-y-2"
              >
                <h3 className="font-medium text-gray-900">
                  {caso.orientacao?.titulo}
                </h3>

                <p className="text-sm text-gray-600">
                  Área: {caso.answers?.area}
                </p>

                <p className="text-sm text-gray-600">
                  {caso.orientacao?.texto}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(caso.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
