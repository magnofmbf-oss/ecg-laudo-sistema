import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializa o SDK apenas se a chave existir
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const extrairDadosPaciente = async (base64Image) => {
  if (!genAI) {
    console.warn(
      "Chave da API do Gemini não configurada (VITE_GEMINI_API_KEY).",
    );
    return null;
  }

  try {
    // Usando o modelo gemini-2.5-flash (o 3.0 ainda não está disponível na API pública v1beta)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // O base64Image vem no formato "data:image/jpeg;base64,/9j/4AAQ..."
    // Precisamos separar o mimeType e os dados puros
    const mimeType = base64Image.split(";")[0].split(":")[1];
    const base64Data = base64Image.split(",")[1];

    const prompt = `
      Analise esta imagem de um exame de ECG e extraia os dados do paciente.
      Retorne APENAS um objeto JSON válido, sem formatação markdown (sem \`\`\`json), com as seguintes chaves exatas:
      - "nome": Nome completo do paciente (string)
      - "cpf": CPF do paciente, se houver (string)
      - "dataNascimento": Data de nascimento no formato YYYY-MM-DD, se houver (string). Exemplo: "1948-10-26". Se a data estiver em outro formato na imagem, converta para YYYY-MM-DD.
      - "idade": Idade do paciente, se houver (string)
      
      Se não encontrar alguma informação, deixe o valor como uma string vazia "".
      Não inclua nenhum texto adicional além do JSON.
    `;

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();

    // Limpar possível formatação markdown residual que a IA possa retornar
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Erro ao extrair dados com Gemini:", error);
    return null;
  }
};
