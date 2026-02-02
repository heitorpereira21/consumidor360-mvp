export const questions = [
  {
    id: "area",
    label: "Qual área melhor descreve seu problema?",
    type: "select",
    options: [
      "Consumidor",
      "Trabalhista",
      "Família",
      "Moradia",
      "Outro",
    ],
  },
  {
    id: "description",
    label: "Explique brevemente o que aconteceu",
    type: "textarea",
  },
  {
    id: "urgency",
    label: "Isso tem prazo ou urgência?",
    type: "select",
    options: ["Não", "Sim, tenho prazo curto"],
  },
];
