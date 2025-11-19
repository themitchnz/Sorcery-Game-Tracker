
import React, { useState } from 'react';

interface SettingsModalProps {
  currentStartingLife: number;
  onSave: (newStartingLife: number) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ currentStartingLife, onSave, onClose }) => {
  const [life, setLife] = useState(String(currentStartingLife));

  const handleSave = () => {
    const newLife = parseInt(life, 10);
    if (!isNaN(newLife) && newLife > 0) {
      onSave(newLife);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 border-2 border-indigo-400 rounded-lg p-6 shadow-2xl w-11/12 max-w-md flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl text-indigo-300">Game Settings</h2>
        
        <div className="w-full mt-4">
          <label htmlFor="starting-life" className="block text-lg text-slate-300 mb-2 text-center">
            Starting Life Total
          </label>
          <input 
            id="starting-life"
            type="number"
            value={life}
            onChange={(e) => setLife(e.target.value)}
            min="1"
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <p className="text-sm text-slate-400 text-center mt-2">
          Changes will apply the next time you reset the game.
        </p>

        <div className="flex justify-around w-full mt-4 gap-4">
            <button
              onClick={onClose}
              className="w-full p-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full p-3 bg-emerald-700 hover:bg-emerald-600 rounded-lg font-bold text-lg transition-colors"
            >
              Save Settings
            </button>
        </div>
      </div>
    </div>
  );
};