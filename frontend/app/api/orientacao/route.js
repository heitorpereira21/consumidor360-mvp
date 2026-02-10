import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { answers } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      // Fallback to local orientation if no API key
      const orientacao = {
        titulo: "Orientação Padrão",
        texto: "Guarde todas as provas relacionadas ao seu caso. Procure orientação jurídica profissional ou órgãos competentes como Procon ou Defensoria Pública.",
        acao: "Salvar caso"
      };
      return Response.json(orientacao);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Você é um assistente jurídico especializado em direitos do consumidor no Brasil. Com base nas respostas do usuário, forneça uma orientação inicial clara, objetiva e útil.

Respostas do usuário:
- Área: ${answers.area}
- Descrição: ${answers.description}
- Urgência: ${answers.urgency}

Forneça uma orientação em formato JSON com os campos:
- titulo: Título da orientação (ex: "Direito do Consumidor")
- texto: Texto explicativo com orientações práticas. Sempre termine o texto com: Link do PROCON: (https://www.gov.br/procon/pt-br)
- acao: Ação recomendada (sempre "Salvar caso")

Mantenha o texto conciso, profissional e focado em direitos brasileiros.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente jurídico brasileiro especializado em direitos do consumidor.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    let responseText = completion.choices[0].message.content.trim();

    // Remove markdown code blocks if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Try to parse as JSON, if not, wrap in JSON structure
    let orientacao;
    try {
      orientacao = JSON.parse(responseText);
    } catch (e) {
      // If not JSON, create a fallback
      orientacao = {
        titulo: "Orientação Jurídica",
        texto: responseText,
        acao: "Salvar caso"
      };
    }

    return Response.json(orientacao);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return Response.json(
      {
        titulo: "Erro na orientação",
        texto: "Desculpe, houve um erro ao gerar a orientação. Tente novamente.",
        acao: "Salvar caso"
      },
      { status: 500 }
    );
  }
}
