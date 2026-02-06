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
      {/* Barra superior */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-xl"
        >
          ☰
        </button>

        <img
          src="/logo.png"
          alt="Consumidor 360"
          className="h-8 object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />

        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm text-blue-600 hover:underline"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Entrar
          </button>
        )}
      </header>

      {/* Menu lateral */}
      {open && (
        <div className="absolute top-14 left-0 w-64 bg-white shadow-lg border p-4 space-y-4 z-50">

          <button
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-800 hover:text-blue-600"
          >
            Minha Área
          </button>

          <button
            onClick={() => {
              router.push("/orientacao");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-800 hover:text-blue-600"
          >
            Novo Caso
          </button>

          <button
            onClick={() => {
              router.push("/embaixadores");
              setOpen(false);
            }}
            className="block w-full text-left text-gray-800 hover:text-blue-600"
          >
            Embaixadores
          </button>

        </div>
      )}
    </>
  );
}
