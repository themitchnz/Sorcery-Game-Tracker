
import React from 'react';
import { PlayerState, ManaColor } from '../types';
import { ManaTracker } from './ManaTracker';
import { SkullIcon, PencilIcon } from './Icons';

interface PlayerTrackerProps {
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  isFlipped: boolean;
  onAvatarClick: () => void;
  manaLayoutSwapped: boolean;
  startingLife: number;
}

export const PlayerTracker: React.FC<PlayerTrackerProps> = ({ playerState, setPlayerState, isFlipped, onAvatarClick, manaLayoutSwapped, startingLife }) => {
  
  const handleLifeChange = (amount: number) => {
    setPlayerState(prev => {
      // If at Death's Door (life <= 0), life cannot be increased.
      if (prev.life <= 0 && amount > 0) {
        return prev;
      }
      
      const newLife = prev.life + amount;
      // Cap life at the starting value when increasing.
      const finalLife = amount > 0 ? Math.min(newLife, startingLife) : newLife;
      
      return { ...prev, life: finalLife };
    });
  };

  const handleManaChange = (amount: number) => {
    setPlayerState(prev => ({ ...prev, manaThreshold: Math.max(0, prev.manaThreshold + amount) }));
  };

  const handleColorThresholdChange = (color: ManaColor, amount: number) => {
    setPlayerState(prev => {
      const newColorValue = Math.max(0, prev.manaColors[color] + amount);
      return {
        ...prev,
        manaColors: { ...prev.manaColors, [color]: newColorValue }
      };
    });
  };

  const isDeathsDoor = playerState.life <= 0;
  const transformClass = isFlipped ? 'rotate-180' : '';
  
  // For both players, the avatar is positioned towards the center bar.
  // - Bottom player (isFlipped=false): justify-start aligns avatar to the top of its container.
  // - Top player (isFlipped=true): justify-start aligns avatar to the top of its container,
  //   and the subsequent rotate-180 transform flips it to the bottom, near the center.
  const avatarAlignClass = 'justify-start';
  
  const shouldReverseMana = (isFlipped && !manaLayoutSwapped) || (!isFlipped && manaLayoutSwapped);
  const manaContainerClass = `w-full flex items-stretch justify-around bg-slate-800/50 ${shouldReverseMana ? 'flex-row-reverse' : ''}`;

  const getLifeRingColorStyle = (life: number): React.CSSProperties => {
    if (life <= 0) {
      // Corresponds to Tailwind's slate-700 for the death state
      return { borderColor: '#334155' }; 
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
        className="absolute inset-0 transition-opacity duration-700 ease-in-out animate-fade-in"
      >
        <img 
          src={playerState.avatar} 
          alt="" 
          className="w-full h-full object-cover blur-lg scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/60"></div>
      </div>

      {/* Content Layer (for Avatar) - positions the avatar relative to the center bar */}
      <div className={`relative z-10 flex-1 flex flex-col items-center ${avatarAlignClass} ${transformClass} p-4`}>
        {/* Avatar & Life Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <div 
              className="relative w-full h-full rounded-full overflow-hidden border-4 shadow-lg transition-colors duration-500 ease-in-out"
              style={getLifeRingColorStyle(playerState.life)}
            >
              <img src={playerState.avatar} alt="Player Avatar" className="w-full h-full object-cover"/>
              
              {/* Top half click area to increase life */}
              <button 
                onClick={() => handleLifeChange(1)}
                disabled={isDeathsDoor}
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full disabled:cursor-not-allowed z-10"
                aria-label="Increase Life"
              />

              {/* Bottom half click area to decrease life */}
              <button 
                onClick={() => handleLifeChange(-1)}
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-2 md:pb-4 text-white rounded-b-full z-10"
                aria-label="Decrease Life"
              >
                {isDeathsDoor ? (
                    <div className="flex flex-col items-center text-center pointer-events-none">
                        <SkullIcon className="w-8 h-8 md:w-10 md:h-10 text-rose-500" />
                        <span className="text-sm md:text-base font-bold text-rose-400 font-cinzel leading-none mt-1">DEATH'S DOOR</span>
                    </div>
                  ) : (
                    <span className="text-6xl md:text-7xl font-bold tabular-nums pointer-events-none">{playerState.life}</span>
                  )}
              </button>
            </div>
          </div>
          
          <button
            onClick={onAvatarClick}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors text-sm"
            aria-label="Change Avatar"
          >
            <PencilIcon className="w-4 h-4" />
            <span>Change Avatar</span>
          </button>
        </div>
      </div>

      {/* Mana Section - now absolutely positioned at top/bottom of the container */}
      <div className={`absolute z-20 w-full ${isFlipped ? 'top-0' : 'bottom-0'} ${transformClass}`}>
        <div className={manaContainerClass}>
          {/* Total Mana Counter */}
          <div className="flex flex-col items-center justify-center w-24 md:w-28 py-3">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <div className="w-full h-full bg-slate-700 rounded-full flex items-center justify-center transition-transform transform hover:scale-105 shadow-md">
                <span className="font-bold text-5xl md:text-6xl tabular-nums text-white pointer-events-none">
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
