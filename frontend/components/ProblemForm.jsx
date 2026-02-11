"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";
import { questions } from "../lib/questions";
import { getOrientacao } from "../lib/decision";

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

    try {
      const storedUser = localStorage.getItem("consumidor360_user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userEmail = parsedUser?.email || null;

      const response = await fetch('/api/orientacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers, userEmail }),
      });

      if (!response.ok) {
        throw new Error('Erro na API');
      }

      const orientacao = await response.json();

      localStorage.setItem(
        "consumidor360_caso",
        JSON.stringify({
          answers,
          orientacao,
          createdAt: new Date().toISOString(),
        })
      );

      setResult(orientacao);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao obter orientação:', error);
      // Fallback para orientação local se a API falhar
      const orientacao = getOrientacao(answers);

      localStorage.setItem(
        "consumidor360_caso",
        JSON.stringify({
          answers,
          orientacao,
          createdAt: new Date().toISOString(),
        })
      );

      setResult(orientacao);
      setShowForm(false);
    }
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  return (
    <>
      {showForm && (
        <div className="space-y-8">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-blue-600 scale-110 shadow-lg"
                      : index < currentStep
                      ? "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {currentStep + 1} de {questions.length}
            </span>
          </div>

          {/* Step Title */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Passo {currentStep + 1}: {currentQuestion.label}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              {currentQuestion.type === "select" && (
                <select
                  required
                  value={answers[currentQuestion.id] || ""}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
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
                  rows={5}
                  required
                  value={answers[currentQuestion.id] || ""}
                  placeholder="Digite sua resposta aqui..."
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4 pt-4">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 rounded-lg bg-gray-100 px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300"
                >
                  ← Anterior
                </button>
              )}

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-sm"
                >
                  Próximo →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!answers[currentQuestion.id]}
                  className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:hover:shadow-sm"
                >
                  Ver orientação inicial
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {result && <ResultCard result={result} cta="/login" />}
    </>
  );
}
