
import React, { useState, useCallback } from 'react';
import ExamGeneratorForm from './components/ExamGeneratorForm';
import ExamDisplay from './components/ExamDisplay';
import Loader from './components/Loader';
import { generateExam, type ExamGenerationResult } from './services/geminiService';
import type { GroundingChunk } from './types';

const App: React.FC = () => {
    const [examResult, setExamResult] = useState<ExamGenerationResult>({ examContent: '', sources: [] });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateExam = useCallback(async (course: string, subject: string, topic: string) => {
        setIsLoading(true);
        setError(null);
        setExamResult({ examContent: '', sources: [] });

        try {
            const result = await generateExam(course, subject, topic);
            setExamResult(result);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado.";
            setError(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
            <main className="container mx-auto">
                <header className="text-center my-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                        Generador de Exámenes con IA
                    </h1>
                    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                        Crea exámenes personalizados al instante. Introduce el curso, la materia y el tema, y deja que la IA haga el resto, buscando en la web para crear preguntas relevantes.
                    </p>
                </header>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl">
                    <ExamGeneratorForm onGenerate={handleGenerateExam} isLoading={isLoading} />
                </div>
                
                {error && (
                    <div className="w-full max-w-4xl mx-auto mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-4">
                        <p className="font-bold">Error al generar el examen:</p>
                        <p>{error}</p>
                    </div>
                )}

                {isLoading ? (
                    <Loader />
                ) : (
                    <ExamDisplay examContent={examResult.examContent} sources={examResult.sources} />
                )}

                <footer className="text-center mt-12 py-6 border-t border-slate-800">
                    <p className="text-slate-500">
                        Desarrollado con React, Tailwind CSS y la API de Gemini.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default App;
