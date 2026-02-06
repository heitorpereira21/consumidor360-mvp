import { GeistSans, GeistMono } from "geist/font";
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
        <Header />

        <main className="min-h-[calc(100vh-64px)] px-4">
          {children}
        </main>
      </body>
    </html>
    )
  }