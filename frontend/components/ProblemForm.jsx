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
          <div className="flex justify-center items-center space-x-4" aria-label={stepLabel}>
            <ol className="flex space-x-2" aria-hidden="true">
              {questions.map((_, index) => (
                <li
                  key={index}
                  aria-current={index === currentStep ? "step" : undefined}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-blue-600 scale-110 shadow-lg"
                      : index < currentStep
                      ? "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </ol>
            <span className="text-sm text-gray-700 font-medium">{stepLabel}</span>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{currentQuestion.label}</h2>
            <p className="sr-only" aria-live="polite">
              {stepLabel}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={questions.length} aria-label={stepLabel}>
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor={fieldId} className="block text-sm font-medium text-gray-800">
                {currentQuestion.label}
              </label>

              {currentQuestion.type === "select" && (
                <select
                  id={fieldId}
                  required
                  value={answers[currentQuestion.id] || ""}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
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
                  rows={5}
                  required
                  value={answers[currentQuestion.id] || ""}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                />
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 rounded-lg bg-gray-100 px-6 py-3 text-gray-800 font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  ← Anterior
                </button>
              )}

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Próximo →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                >
                  Ver orientação inicial
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {result && <ResultCard result={result} cta={getStoredUser()?.email ? "/dashboard" : "/login"} />}
    </>
  );
}
