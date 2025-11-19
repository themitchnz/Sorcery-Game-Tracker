
import React, { useState, useRef, useEffect } from 'react';
import { PlayerState, ManaColor } from '../types';
import { ManaTracker } from './ManaTracker';
import { PencilIcon } from './Icons';
import { useSwipe } from './useSwipe';

interface PlayerTrackerProps {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  isFlipped: boolean;
  onAvatarClick: () => void;
  manaLayoutSwapped: boolean;
  startingLife: number;
  tagline?: string;
}

export const PlayerTracker: React.FC<PlayerTrackerProps> = ({ playerState, setPlayerState, isFlipped, onAvatarClick, manaLayoutSwapped, startingLife, tagline }) => {
  
  const isDeathsDoor = playerState.life <= 0;
  const [lifeDelta, setLifeDelta] = useState(0);
  const deltaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (deltaTimerRef.current) clearTimeout(deltaTimerRef.current);
    };
  }, []);

  const handleLifeChange = (amount: number) => {
    // 1. Calculate visual delta based on current prop state
    let effectiveAmount = amount;
    const currentLife = playerState.life;

    // Check constraints matching the update logic
    if (amount > 0 && currentLife + amount > startingLife) {
      effectiveAmount = startingLife - currentLife; // Cap at starting life
    } else if (amount < 0 && currentLife + amount < 0) {
      effectiveAmount = -currentLife; // Cap at 0
    }

    // 2. Update Delta State
    if (effectiveAmount !== 0) {
      setLifeDelta(prev => prev + effectiveAmount);
      
      if (deltaTimerRef.current) {
        clearTimeout(deltaTimerRef.current);
      }
      
      deltaTimerRef.current = setTimeout(() => {
        setLifeDelta(0);
      }, 1500);
    }

    // 3. Update Actual Player State
    setPlayerState(prev => {
      const newLife = prev.life + amount;
      // Cap life at the starting value when increasing, and at 0 when decreasing.
      let finalLife = newLife;
      if (amount > 0) {
        finalLife = Math.min(newLife, startingLife);
      } else {
        finalLife = Math.max(newLife, 0);
      }
      
      return { ...prev, life: finalLife };
    });
  };

  const lifeSwipeHandlers = useSwipe({
    onSwipeUp: () => handleLifeChange(1),
    onSwipeDown: () => handleLifeChange(-1),
  });

  const handleManaChange = (amount: number) => {
    setPlayerState(prev => ({ ...prev, manaThreshold: Math.max(0, prev.manaThreshold + amount) }));
  };

  const manaSwipeHandlers = useSwipe({
    onSwipeUp: () => handleManaChange(1),
    onSwipeDown: () => playerState.manaThreshold > 0 && handleManaChange(-1),
  });

  const handleColorThresholdChange = (color: ManaColor, amount: number) => {
    setPlayerState(prev => {
      const newColorValue = Math.max(0, prev.manaColors[color] + amount);
      return {
        ...prev,
        manaColors: { ...prev.manaColors, [color]: newColorValue }
      };
    });
  };

  const transformClass = isFlipped ? 'rotate-180' : '';
  
  // For both players, the avatar is positioned towards the center bar.
  // - Bottom player (isFlipped=false): justify-start aligns avatar to the top of its container.
  // - Top player (isFlipped=true): justify-start aligns avatar to the top of its container,
  //   and the subsequent rotate-180 transform flips it to the bottom, near the center.
  const avatarAlignClass = 'justify-start';
  
  const shouldReverseMana = (isFlipped && !manaLayoutSwapped) || (!isFlipped && manaLayoutSwapped);
  const manaContainerClass = `w-full flex items-stretch justify-around bg-slate-800-50 ${shouldReverseMana ? 'flex-row-reverse' : ''}`;

  const getLifeRingColorStyle = (life: number): React.CSSProperties => {
    if (life <= 0) {
      // A deep, menacing red for Death's Door
      return { borderColor: '#e11d48' }; // Tailwind's rose-600
    }
    // Clamp life to ensure the percentage is between 0 and 1
    const clampedLife = Math.max(0, Math.min(life, startingLife));
    const percentage = clampedLife / startingLife;
    
    // Hue smoothly transitions from 0 (red) to 120 (green) via yellow.
    const hue = percentage * 120;
    
    return { borderColor: `hsl(${hue}, 85%, 50%)` };
  };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col">
      {/* Background Layer */}
      <div 
        key={playerState.avatar} 
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out animate-fade-in ${isFlipped ? 'rotate-180' : ''}`}
      >
        <img 
          src={playerState.avatar} 
          alt="" 
          className="w-full h-full object-cover blur scale-110"
        />
        <div className="absolute inset-0 bg-slate-900-60"></div>
      </div>

      {/* Content Layer (for Avatar) - positions the avatar relative to the center bar */}
      <div className={`relative z-10 flex-1 flex flex-col items-center ${avatarAlignClass} ${transformClass} p-4`}>
        {/* Avatar & Life Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-40 h-40 md:w-56 md:h-56" {...lifeSwipeHandlers}>
            <div 
              className="relative w-full h-full rounded-full overflow-hidden border-4 shadow-lg transition-colors duration-500 ease-in-out"
              style={getLifeRingColorStyle(playerState.life)}
            >
              <img src={playerState.avatar} alt="Player Avatar" className={`w-full h-full object-cover transition-all duration-500 ${isDeathsDoor ? 'filter grayscale' : ''}`}/>
              
              {/* Top half click area to increase life */}
              <button 
                onClick={() => handleLifeChange(1)}
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full z-10"
                aria-label="Increase Life"
              />

              {/* Bottom half click area to decrease life */}
              <button 
                onClick={() => handleLifeChange(-1)}
                className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full z-10"
                aria-label="Decrease Life"
              />

              {/* VISUALS */}
              {isDeathsDoor ? (
                <div className="absolute inset-0 bg-black/70 rounded-full flex flex-col items-center justify-center text-center pointer-events-none animate-fade-in z-5 leading-tight">
                  <span className="text-lg md:text-xl tracking-widest text-rose-400">DEATH'S</span>
                  <span className="text-lg md:text-xl tracking-widest text-rose-400">DOOR</span>
                </div>
              ) : (
                <div className="absolute bottom-0 left-0 right-0 h-1/2 gradient-black-70-to-transparent flex items-end justify-center pb-2 md:pb-4 text-white rounded-b-full pointer-events-none z-5">
                   <span className="text-6xl md:text-7xl font-bold tabular-nums">{playerState.life}</span>
                </div>
              )}
            </div>
            
            {/* Life Delta Indicator - positioned next to the ring on the side of the mana total */}
            {lifeDelta !== 0 && (
                <div className={`absolute top-1/2 -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap ${shouldReverseMana ? 'left-full pl-4 md:pl-6' : 'right-full pr-4 md:pr-6'}`}>
                  <div className={`animate-fade-in ${shouldReverseMana ? 'origin-left' : 'origin-right'}`}>
                    <span 
                      className={`inline-block transition-transform duration-200 text-5xl md:text-6xl font-bold tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,1)] ${lifeDelta > 0 ? 'text-emerald-400' : 'text-rose-500'}`}
                      style={{ transform: `scale(${1 + Math.min((Math.abs(lifeDelta) - 1) * 0.1, 0.6)})` }}
                    >
                      {lifeDelta > 0 ? `+${lifeDelta}` : lifeDelta}
                    </span>
                  </div>
                </div>
            )}
          </div>

          <button
            onClick={onAvatarClick}
            className="group flex items-center justify-center gap-2 mt-1 max-w-xs px-2 py-1 rounded-lg hover:bg-white/5 transition-all duration-300 outline-none"
            aria-label="Change Avatar"
          >
            {tagline ? (
                <>
                  <span className="text-xs md:text-sm text-indigo-200/70 italic text-center font-serif group-hover:text-indigo-100 transition-colors animate-fade-in leading-tight">
                    {tagline}
                  </span>
                  <PencilIcon className="w-3 h-3 text-slate-500 group-hover:text-indigo-300 transition-colors flex-shrink-0 opacity-60 group-hover:opacity-100" />
                </>
            ) : (
                <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                    <PencilIcon className="w-4 h-4" />
                    <span>Change Avatar</span>
                </div>
            )}
          </button>
        </div>
      </div>

      {/* Mana Section - now absolutely positioned at top/bottom of the container */}
      <div className={`absolute z-20 w-full ${isFlipped ? 'top-0' : 'bottom-0'} ${transformClass}`}>
        <div className={manaContainerClass}>
          {/* Total Mana Counter */}
          <div className="flex flex-col items-center justify-center w-24 md:w-28 py-3">
            <div className="relative w-20 h-20 md:w-24 md:h-24" {...manaSwipeHandlers}>
              <div className="w-full h-full bg-slate-700 rounded-full flex items-center justify-center transition-transform transform hover:scale-105 shadow-md">
                <span className="font-bold text-5xl md:text-6xl tabular-nums text-white pointer-events-none leading-none pt-1">
                  {playerState.manaThreshold}
                </span>
              </div>
              
              {/* Top half click area to increase mana */}
              <button
                onClick={() => handleManaChange(1)}
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full z-10"
                aria-label="Increase mana threshold"
              />

              {/* Bottom half click area to decrease mana */}
              <button
                onClick={() => handleManaChange(-1)}
                disabled={playerState.manaThreshold <= 0}
                className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full disabled:cursor-not-allowed z-10"
                aria-label="Decrease mana threshold"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-slate-600 my-2"></div>

          <ManaTracker manaColors={playerState.manaColors} onThresholdChange={handleColorThresholdChange} />
        </div>
      </div>
    </div>
  );
};
