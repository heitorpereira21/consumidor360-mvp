"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";
import { questions } from "../lib/questions";

export default function ProblemForm() {
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<string | null>(null);

  function handleChange(id: string, value: string) {
    setAnswers({ ...answers, [id]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (answers.area === "Consumidor") {
      setResult(
        "Você pode estar diante de uma relação de consumo. Guarde provas e procure orientação especializada."
      );
    } else {
      setResult(
        "Seu caso pode exigir análise específica. O próximo passo é buscar orientação adequada."
      );
    }
  }

  return (
    <>
            <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q) => (
            <div key={q.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
                {q.label}
            </label>

            {q.type === "select" && (
                <select
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(q.id, e.target.value)}
                >
                <option value="">Selecione</option>
                {q.options?.map((opt) => (
                    <option key={opt} value={opt}>
                    {opt}
                    </option>
                ))}
                </select>
            )}

            {q.type === "textarea" && (
                <textarea
                rows={4}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(q.id, e.target.value)}
                />
            )}
            </div>
        ))}

        <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 shadow-md px-4 py-4 text-white font-medium hover:bg-blue-700 transition"
        >
            Ver orientação inicial
        </button>
        </form>


      {result && <ResultCard text={result} />}
    </>
  );
}
