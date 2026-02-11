import OpenAI from "openai";
import { createCaseWithOrientation } from "../../../lib/db";

function sanitizeJsonResponse(text) {
  let responseText = String(text || "").trim();

  if (responseText.startsWith("```json")) {
    responseText = responseText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (responseText.startsWith("```")) {
    responseText = responseText.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  return responseText;
}

async function persistCase({ answers, orientacao, userEmail, model }) {
  try {
    await createCaseWithOrientation({ answers, orientacao, userEmail, model });
  } catch (error) {
    console.error("Erro ao persistir caso/orientação:", error);
  }
}

export async function POST(request) {
  try {
    const { answers, userEmail } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      const orientacao = {
        titulo: "Orientação Padrão",
        texto:
          "Guarde todas as provas relacionadas ao seu caso. Procure orientação jurídica profissional ou órgãos competentes como Procon ou Defensoria Pública.",
        acao: "Salvar caso",
      };

      await persistCase({ answers, orientacao, userEmail, model: "fallback" });
      return Response.json(orientacao);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Você é um assistente jurídico especializado em direitos do consumidor no Brasil. Com base nas respostas do usuário, forneça uma orientação inicial clara, objetiva e útil.

Respostas do usuário:
- Área: ${answers?.area}
- Descrição: ${answers?.description}
- Urgência: ${answers?.urgency}

Forneça uma orientação em formato JSON com os campos:
- titulo: Título da orientação (ex: "Direito do Consumidor")
- texto: Texto explicativo com orientações práticas. Sempre termine o texto com: Link do PROCON: (https://www.gov.br/procon/pt-br)
- acao: Ação recomendada (sempre "Salvar caso")

Mantenha o texto conciso, profissional e focado em direitos brasileiros.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um assistente jurídico brasileiro especializado em direitos do consumidor.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices?.[0]?.message?.content || "";
    const responseText = sanitizeJsonResponse(content);

    let orientacao;
    try {
      orientacao = JSON.parse(responseText);
    } catch {
      orientacao = {
        titulo: "Orientação Jurídica",
        texto: responseText,
        acao: "Salvar caso",
      };
    }

    await persistCase({ answers, orientacao, userEmail, model: "gpt-3.5-turbo" });

    return Response.json(orientacao);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      {
        titulo: "Erro na orientação",
        texto: "Desculpe, houve um erro ao gerar a orientação. Tente novamente.",
        acao: "Salvar caso",
      },
      { status: 500 }
    );
  }
}
