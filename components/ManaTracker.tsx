
import React from 'react';
import { ManaColors, ManaColor } from '../types';
import { AirIcon, EarthIcon, FireIcon, WaterIcon } from './Icons';
import { useSwipe } from './useSwipe';

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
        
        const swipeHandlers = useSwipe({
          onSwipeUp: () => onThresholdChange(color, 1),
          onSwipeDown: () => value > 0 && onThresholdChange(color, -1),
        });

        return (
          <div key={color} className="flex flex-col items-center justify-between w-20 md:w-24 py-1" {...swipeHandlers}>
            <button 
              onClick={() => onThresholdChange(color, 1)}
              aria-label={`Increase ${color} threshold`}
              className="w-full flex-1 flex items-end justify-center transition-transform transform hover:scale-110 pb-1"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ${isActive ? activeClass : 'text-slate-600'}`}>
                <Icon />
              </div>
            </button>
            <button 
              onClick={() => onThresholdChange(color, -1)} 
              disabled={value <= 0}
              aria-label={`Decrease ${color} threshold`}
              className="w-full flex items-start justify-center disabled:opacity-40 disabled:cursor-not-allowed grow-[2] pt-1"
            >
              <span className={`font-bold text-5xl md:text-6xl tabular-nums transition-colors leading-none ${isActive ? 'text-white hover:text-slate-300' : 'text-slate-400'}`}>{value}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
