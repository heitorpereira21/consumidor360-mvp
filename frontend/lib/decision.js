export function getOrientacao(answers) {
  switch (answers.area) {
    case "Consumidor":
      return {
        titulo: "Direito do Consumidor",
        texto:
          "Guarde provas, contratos e protocolos. Procure o Procon ou canais oficiais.",
        acao: "Salvar caso",
      };

    case "Trabalhista":
      return {
        titulo: "Direito Trabalhista",
        texto:
          "Reúna holerites, contrato e carteira de trabalho. Um advogado ou sindicato pode orientar.",
        acao: "Salvar caso",
      };

    case "Família":
      return {
        titulo: "Direito de Família",
        texto:
          "Casos familiares exigem análise cuidadosa. A Defensoria Pública pode ser o primeiro passo.",
        acao: "Salvar caso",
      };

    case "Moradia":
      return {
        titulo: "Moradia / Imóvel",
        texto:
          "Separe contratos e comprovantes. Órgãos municipais ou defensoria podem ajudar.",
        acao: "Salvar caso",
      };

    default:
      return {
        titulo: "Orientação geral",
        texto:
          "Seu caso pode exigir análise específica. Busque orientação adequada.",
        acao: "Salvar caso",
      };
  }
}
