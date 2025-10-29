
import React from 'react';
import type { GroundingChunk } from '../types';

interface ExamDisplayProps {
    examContent: string;
    sources: GroundingChunk[];
}

const ExamDisplay: React.FC<ExamDisplayProps> = ({ examContent, sources }) => {
    if (!examContent) {
        return (
            <div className="w-full max-w-4xl mx-auto mt-8 text-center bg-slate-800 rounded-lg p-8 border border-slate-700">
                <h2 className="text-xl font-semibold text-slate-300">¡Tu examen aparecerá aquí!</h2>
                <p className="text-slate-400 mt-2">Rellena los campos de arriba y haz clic en "Generar Examen" para empezar.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 md:p-8 border border-slate-700 shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-400 mb-4">Examen Generado</h2>
                <div className="prose prose-invert prose-slate max-w-none whitespace-pre-wrap text-slate-300">
                    {examContent}
                </div>
            </div>

            {sources.length > 0 && (
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
                    <h3 className="text-xl font-bold text-indigo-400 mb-3">Fuentes</h3>
                    <ul className="space-y-2">
                        {sources.map((source, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-indigo-500 mr-2 mt-1">&#8227;</span>
                                <a
                                    href={source.web.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-300 hover:text-indigo-400 transition-colors underline"
                                >
                                    {source.web.title || source.web.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExamDisplay;
