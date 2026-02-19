import { GeistSans } from "geist/font";
import "./globals.css";
import Header from "../components/header";

export const metadata = {
  title: "Consumidor 360",
  description: "Orientação jurídica simplificada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${GeistSans.className} antialiased bg-gray-50 min-h-screen`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-blue-700 focus:shadow"
        >
          Pular para o conteúdo principal
        </a>
        <Header />

        <main id="main-content" className="min-h-[calc(100vh-64px)] px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
