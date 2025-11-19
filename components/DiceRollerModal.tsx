
import React, { useState } from 'react';

interface DiceRollerModalProps {
  onClose: () => void;
}

export const DiceRollerModal: React.FC<DiceRollerModalProps> = ({ onClose }) => {
  const [result, setResult] = useState<string | number | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [customSides, setCustomSides] = useState<string>('');

  const rollDie = (sides: number) => {
    if (sides <= 0) return;
    const rollResult = Math.floor(Math.random() * sides) + 1;
    setResult(rollResult);
    setLastAction(`d${sides}`);
  };
  
  const flipCoin = () => {
    const coinResult = Math.random() < 0.5 ? 'Heads' : 'Tails';
    setResult(coinResult);
    setLastAction('Coin Flip');
  };

  const handleCustomRoll = (e: React.FormEvent) => {
    e.preventDefault();
    const sides = parseInt(customSides, 10);
    if (!isNaN(sides) && sides > 0) {
        rollDie(sides);
    }
  };


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 border-2 border-indigo-400 rounded-lg p-6 shadow-2xl w-11/12 max-w-md flex flex-col items-center gap-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl text-indigo-300">Roll Dice / Flip Coin</h2>
        
        <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={flipCoin}
              className="p-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-bold text-lg transition-transform transform hover:scale-105"
            >
              Coin Flip
            </button>
            <button
              onClick={() => rollDie(6)}
              className="p-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-bold text-lg transition-transform transform hover:scale-105"
            >
              d6
            </button>
            <button
              onClick={() => rollDie(20)}
              className="col-span-2 p-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-bold text-lg transition-transform transform hover:scale-105"
            >
              d20
            </button>
        </div>

        <form onSubmit={handleCustomRoll} className="flex gap-3 w-full mt-2">
            <input 
                type="number"
                value={customSides}
                onChange={(e) => setCustomSides(e.target.value)}
                placeholder="Custom d(x)"
                min="1"
                className="flex-grow bg-slate-900 border border-slate-600 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
             <button
              type="submit"
              className="p-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-bold text-lg transition-transform transform hover:scale-105"
            >
              Roll
            </button>
        </form>
        
        <div className="mt-4 p-4 bg-slate-900 rounded-lg w-full text-center flex flex-col justify-center items-center transition-all duration-300 ease-in-out h-32">
          {result !== null && lastAction !== null ? (
            <div className="animate-fade-in">
              <p className="text-slate-400">
                  {lastAction === 'Coin Flip' ? 'Result:' : `You rolled a ${lastAction}:`}
              </p>
              <p className="text-6xl font-bold text-white tracking-wider">{result}</p>
            </div>
          ) : (
            <p className="text-slate-500 italic">The dice are waiting...</p>
          )}
        </div>

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