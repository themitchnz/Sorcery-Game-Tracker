
import React, { useState } from 'react';

interface CodexModalProps {
  onClose: () => void;
}

type View = 'codex' | 'cards' | 'faqs';

const views: Record<View, { title: string; url: string }> = {
  codex: { title: 'The Codex', url: 'https://curiosa.io/codex' },
  cards: { title: 'Card Gallery', url: 'https://curiosa.io/cards' },
  faqs: { title: 'Official FAQs', url: 'https://curiosa.io/faqs' },
};

export const CodexModal: React.FC<CodexModalProps> = ({ onClose }) => {
  const [activeView, setActiveView] = useState<View>('codex');

  const ViewSwitcher: React.FC<{ className?: string }> = ({ className }) => (
    <div className={className}>
      {(Object.keys(views) as View[]).map((view) => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          className={`flex-1 sm:flex-none px-3 py-2 sm:py-1 rounded-md font-bold text-sm transition-colors ${
            activeView === view
              ? 'bg-indigo-700 text-white'
              : 'bg-transparent text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {view.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 border-2 border-indigo-400 rounded-lg shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-xl md:text-2xl text-indigo-300">{views[activeView].title}</h2>
            <div className="flex items-center gap-4">
                <ViewSwitcher className="hidden sm:flex items-center gap-2 rounded-lg p-1 bg-slate-900" />
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg transition-colors"
                >
                  Close
                </button>
            </div>
        </div>

        <ViewSwitcher className="sm:hidden flex items-center justify-around border-b border-slate-700 bg-slate-900/50" />
        
        <div className="flex-grow p-1 md:p-2 overflow-hidden">
            <iframe
                key={activeView}
                src={views[activeView].url}
                title={`Sorcery: Contested Realm - ${views[activeView].title}`}
                className="w-full h-full border-0 rounded-b-md"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
      </div>
    </div>
  );
};