"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("consumidor360_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("consumidor360_user");
    setOpen(false);
    router.push("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg px-2 py-1 text-xl text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label="Abrir menu principal"
            type="button"
          >
            ☰
          </button>

          <button
            type="button"
            aria-label="Ir para página inicial"
            onClick={() => router.push("/")}
            className="rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            <img
              src="/logo.png"
              alt="Consumidor 360"
              className="h-8 object-contain"
            />
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              type="button"
            >
              Sair
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              type="button"
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
          />

          <nav
            id="menu-principal"
            className="fixed left-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-xl"
            aria-label="Menu lateral"
          >
            <div className="mb-3 border-b border-gray-100 pb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Navegação
            </div>

            {[ ["Minha Área", "/dashboard"], ["Novo Caso", "/orientacao"], ["Embaixadores", "/embaixadores"] ].map(([label, path]) => (
              <button
                key={label}
                onClick={() => {
                  router.push(path);
                  setOpen(false);
                }}
                className="mb-2 block w-full rounded-xl px-3 py-2 text-left text-gray-900 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
