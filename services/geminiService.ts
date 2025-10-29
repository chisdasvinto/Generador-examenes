
import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk } from '../types';

export interface ExamGenerationResult {
    examContent: string;
    sources: GroundingChunk[];
}

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateExam = async (course: string, subject: string, topic: string): Promise<ExamGenerationResult> => {
    try {
        const prompt = `
        Genera un examen detallado y completo para el curso de '${course}', en la materia de '${subject}', sobre el tema específico de '${topic}'.
        
        El examen debe estar bien estructurado y contener los siguientes tipos de preguntas:
        1.  **Preguntas de Opción Múltiple:** Incluye 4 opciones por pregunta (A, B, C, D) y marca la respuesta correcta con un asterisco (*).
        2.  **Preguntas de Verdadero o Falso.**
        3.  **Preguntas de Respuesta Corta:** Preguntas que requieran una respuesta concisa de una o dos frases.

        Basa las preguntas en información precisa y actualizada, utilizando como referencia exámenes y materiales educativos reales encontrados en línea. El examen debe ser desafiante pero justo.

        Formatea la salida en Markdown.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const examContent = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources = groundingMetadata?.groundingChunks?.filter((chunk): chunk is GroundingChunk => 'web' in chunk) ?? [];

        return { examContent, sources };
    } catch (error) {
        console.error("Error generating exam:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate exam: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the exam.");
    }
};
