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
    router.push("/login");
  }

  return (
    <>
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2"
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
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
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
            className="text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
            type="button"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded"
            type="button"
          >
            Entrar
          </button>
        )}
      </header>

      {open && (
        <nav
          id="menu-principal"
          className="absolute top-14 left-0 w-64 bg-white shadow-lg border p-4 space-y-4 z-50"
          aria-label="Menu lateral"
        >
          <button
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-900 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            type="button"
          >
            Minha Área
          </button>

          <button
            onClick={() => {
              router.push("/orientacao");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-900 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            type="button"
          >
            Novo Caso
          </button>

          <button
            onClick={() => {
              router.push("/embaixadores");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-900 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            type="button"
          >
            Embaixadores
          </button>
        </nav>
      )}
    </>
  );
}
