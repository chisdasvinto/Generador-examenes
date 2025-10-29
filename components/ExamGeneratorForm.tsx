
import React, { useState } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface ExamGeneratorFormProps {
    onGenerate: (course: string, subject: string, topic: string) => void;
    isLoading: boolean;
}

const ExamGeneratorForm: React.FC<ExamGeneratorFormProps> = ({ onGenerate, isLoading }) => {
    const [course, setCourse] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!course || !subject || !topic) {
            alert('Por favor, rellena todos los campos.');
            return;
        }
        onGenerate(course, subject, topic);
    };

    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-slate-300 mb-1">Curso</label>
                    <input
                        type="text"
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Ej: Bachillerato"
                        className={inputClasses}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">Materia</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Ej: Historia"
                        className={inputClasses}
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-1">Asignatura / Tema</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ej: Segunda Guerra Mundial"
                        className={inputClasses}
                        disabled={isLoading}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed transform hover:scale-105"
            >
                <SparklesIcon className="w-5 h-5" />
                {isLoading ? 'Generando Examen...' : 'Generar Examen'}
            </button>
        </form>
    );
};

export default ExamGeneratorForm;
