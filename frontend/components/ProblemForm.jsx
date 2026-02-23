"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";
import { questions } from "../lib/questions";
import { getOrientacao } from "../lib/decision";
import { getStoredUser, saveCaseForUser } from "../lib/session";

export default function ProblemForm() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  function handleChange(id, value) {
    setAnswers({ ...answers, [id]: value });
  }

  function nextStep() {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const storedUser = getStoredUser();
    const userEmail = storedUser?.email || null;

    try {
      const response = await fetch("/api/orientacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, userEmail }),
      });

      if (!response.ok) {
        throw new Error("Erro na API");
      }

      const orientacao = await response.json();

      const caso = {
        id: crypto.randomUUID(),
        answers,
        orientacao,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("consumidor360_caso", JSON.stringify(caso));

      if (userEmail) {
        saveCaseForUser(userEmail, caso);
      }

      setResult(orientacao);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao obter orientação:", error);
      const orientacao = getOrientacao(answers);

      const caso = {
        id: crypto.randomUUID(),
        answers,
        orientacao,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("consumidor360_caso", JSON.stringify(caso));

      if (userEmail) {
        saveCaseForUser(userEmail, caso);
      }

      setResult(orientacao);
      setShowForm(false);
    }
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const fieldId = `question-${currentQuestion.id}`;
  const stepLabel = `Passo ${currentStep + 1} de ${questions.length}`;

  return (
    <>
      {showForm && (
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5">
            <div className="flex items-center justify-between gap-4" aria-label={stepLabel}>
              <ol className="flex space-x-2" aria-hidden="true">
                {questions.map((_, index) => (
                  <li
                    key={index}
                    aria-current={index === currentStep ? "step" : undefined}
                    className={`h-3 w-3 rounded-full transition-all duration-300 md:h-4 md:w-4 ${
                      index === currentStep
                        ? "bg-blue-600 scale-110 shadow"
                        : index < currentStep
                        ? "bg-blue-400"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </ol>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-700 md:text-sm">{stepLabel}</span>
            </div>

            <div className="mt-4">
              <div
                className="h-2 w-full rounded-full bg-gray-200"
                role="progressbar"
                aria-valuenow={currentStep + 1}
                aria-valuemin={1}
                aria-valuemax={questions.length}
                aria-label={stepLabel}
              >
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">{currentQuestion.label}</h2>
              <p className="text-sm text-gray-600">Responda com o máximo de clareza para melhorar a orientação.</p>
              <label htmlFor={fieldId} className="sr-only">
                {currentQuestion.label}
              </label>

              {currentQuestion.type === "select" && (
                <select
                  id={fieldId}
                  required
                  value={answers[currentQuestion.id] || ""}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  {currentQuestion.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {currentQuestion.type === "textarea" && (
                <textarea
                  id={fieldId}
                  rows={6}
                  required
                  value={answers[currentQuestion.id] || ""}
                  placeholder="Ex.: Comprei o produto em 10/01, solicitei troca em 15/01 e não tive retorno..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                />
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  ← Anterior
                </button>
              )}

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Continuar →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
                >
                  Gerar orientação inicial
                </button>
              )}
            </div>

            <div className="pt-1 text-center">
              <a
                href="https://www.procon.sp.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Acessar site do Procon
              </a>
            </div>
          </form>
        </div>
      )}

      {result && <ResultCard result={result} cta={getStoredUser()?.email ? "/dashboard" : "/login"} />}
    </>
  );
}
