
import React from 'react';
import { ManaColors, ManaColor } from '../types';
import { AirIcon, EarthIcon, FireIcon, WaterIcon } from './Icons';

interface ManaTrackerProps {
  manaColors: ManaColors;
  onThresholdChange: (color: ManaColor, amount: number) => void;
}

const manaIconMap: Record<ManaColor, { icon: React.FC<React.SVGProps<SVGSVGElement>>; activeClass: string; }> = {
  earth: { icon: EarthIcon, activeClass: 'text-[#ab9974] animate-pulse-glow' },
  fire: { icon: FireIcon, activeClass: 'text-[#ff7017] animate-pulse-glow' },
  water: { icon: WaterIcon, activeClass: 'text-[#69daf0] animate-pulse-glow' },
  air: { icon: AirIcon, activeClass: 'text-[#a5aecd] animate-pulse-glow' },
};

export const ManaTracker: React.FC<ManaTrackerProps> = ({ manaColors, onThresholdChange }) => {
  return (
    <div className="flex flex-grow items-stretch justify-around">
      {(Object.keys(manaColors) as ManaColor[]).map((color) => {
        const { icon: Icon, activeClass } = manaIconMap[color];
        const value = manaColors[color];
        const isActive = value > 0;
        return (
          <div key={color} className="flex flex-col items-center justify-between w-20 md:w-24">
            <button 
              onClick={() => onThresholdChange(color, 1)}
              aria-label={`Increase ${color} threshold`}
              className="w-full flex-1 flex items-center justify-center transition-transform transform hover:scale-110 pt-2"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 transition-all duration-300 ${isActive ? activeClass : 'text-slate-600'}`}>
                <Icon />
              </div>
            </button>
            <button 
              onClick={() => onThresholdChange(color, -1)} 
              disabled={value <= 0}
              aria-label={`Decrease ${color} threshold`}
              className="w-full flex-1 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed grow-[1.5]"
            >
              <span className={`font-bold text-3xl md:text-4xl tabular-nums transition-colors ${isActive ? 'text-white hover:text-slate-300' : 'text-slate-400'}`}>{value}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
