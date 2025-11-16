import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface CodexModalProps {
  onClose: () => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (!navigator.onLine) {
        setError('You must be online to consult the Codex.');
        return;
    }

    setIsLoading(true);
    setAnswer('');
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = "You are an expert judge for the trading card game 'Sorcery: Contested Realm'. Your knowledge is based on the official Comprehensive Rules Codex. When a player asks a question, provide a clear, concise, and accurate answer based on these rules. If the question is ambiguous or you cannot provide a definitive answer, state that. Do not invent rules. The primary reference is the Codex found at curiosa.io/codex.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: question,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
        }
      });

      setAnswer(response.text);
    } catch (e) {
      console.error(e);
      setError('The Codex is silent... An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 border-2 border-amber-300 rounded-lg p-6 shadow-2xl w-11/12 max-w-lg flex flex-col items-center gap-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-cinzel text-3xl text-amber-300">Ask the Codex</h2>
        <p className="text-slate-400 text-center text-sm -mt-2">Have a rules question? The Codex has answers.</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Can I cast a spell if my site is contested?"
                rows={3}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label="Rule question"
                disabled={isLoading}
            />
             <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="p-3 bg-purple-800 hover:bg-purple-700 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Consulting the Ancients...' : 'Ask'}
            </button>
        </form>
        
        {(answer || error || isLoading) && (
          <div className="mt-4 p-4 bg-slate-900 rounded-lg w-full text-left max-h-60 overflow-y-auto">
            {isLoading && <p className="text-slate-400 text-center animate-pulse">The Codex is searching for an answer...</p>}
            {error && <p className="text-rose-400 text-center">{error}</p>}
            {answer && <p className="text-slate-200 whitespace-pre-wrap">{answer}</p>}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full p-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};