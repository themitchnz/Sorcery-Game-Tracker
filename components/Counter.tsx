import React from 'react';
import { SkullIcon } from './Icons';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  title: string;
  icon: React.ReactNode;
}

export const Counter: React.FC<CounterProps> = ({ value, onIncrement, onDecrement, title, icon }) => {
  const isDeathsDoor = title === 'Life' && value <= 0;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-800/50 rounded-lg p-2 md:p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-2">
        {isDeathsDoor ? <SkullIcon className="w-8 h-8 md:w-10 md:h-10 text-rose-500"/> : icon}
        <h3 className="font-cinzel text-lg md:text-2xl text-slate-300">{title}</h3>
      </div>
      <div className="flex items-center justify-around w-full flex-1">
        <button 
          onClick={onDecrement} 
          className="text-4xl md:text-5xl font-bold text-slate-400 hover:text-white transition-colors w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 active:bg-slate-500"
          aria-label={`Decrease ${title}`}
        >
          -
        </button>

        {isDeathsDoor ? (
          <div className="flex flex-col items-center justify-center text-center w-28 leading-none">
            <span className="text-xl md:text-3xl font-bold text-rose-400 font-cinzel">DEATH'S</span>
            <span className="text-xl md:text-3xl font-bold text-rose-400 font-cinzel">DOOR</span>
          </div>
        ) : (
          <span className="text-6xl md:text-8xl font-bold text-white w-28 text-center tabular-nums">{value}</span>
        )}
        
        <button 
          onClick={onIncrement} 
          disabled={isDeathsDoor}
          className="text-4xl md:text-5xl font-bold text-slate-400 hover:text-white transition-colors w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-700"
          aria-label={`Increase ${title}`}
        >
          +
        </button>
      </div>
    </div>
  );
};