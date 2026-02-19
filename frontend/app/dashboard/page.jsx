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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Minha Área</h1>
              <p className="mt-1 text-sm text-gray-600">Acompanhe seus casos e próximos passos.</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              type="button"
            >
              Sair
            </button>
          </div>

          {user && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-700">Conta conectada</p>
              <p className="mt-1 font-medium text-gray-900">{user.email}</p>
            </div>
          )}
        </section>

        <section className="space-y-4" aria-labelledby="meus-casos-titulo">
          <div className="flex items-center justify-between">
            <h2 id="meus-casos-titulo" className="text-lg font-semibold text-gray-900">
              Meus Casos
            </h2>
            <button
              onClick={() => router.push("/orientacao")}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              type="button"
            >
              Novo caso
            </button>
          </div>

          {casos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-700">Você ainda não salvou nenhum caso.</p>
              <p className="mt-2 text-sm text-gray-500">
                Comece uma nova orientação para ver seu histórico aqui.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {casos.map((caso, index) => (
                <article
                  key={caso.id || index}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-gray-900">{caso.orientacao?.titulo}</h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {new Date(caso.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-blue-700">Área: {caso.answers?.area}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{caso.orientacao?.texto}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
