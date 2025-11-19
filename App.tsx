
import React, { useState, useCallback, useEffect } from 'react';
import { PlayerState } from './types';
import { PlayerTracker } from './components/PlayerTracker';
import { DiceRollerModal } from './components/DiceRollerModal';
import { AvatarSelectorModal } from './components/AvatarSelectorModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { CodexModal } from './components/CodexModal';
import { DiceIcon, SwapIcon, CodexIcon } from './components/Icons';

const GITHUB_AVATAR_BASE_URL = 'https://raw.githubusercontent.com/themitchnz/Sorcery-Game-Tracker/main/imgs/avatars/';
const AVATAR_FILENAMES = [
  'archimago.png',
  'avatar_of_air.png',
  'avatar_of_earth.png',
  'avatar_of_fire.png',
  'avatar_of_water.png',
  'battlemage.png',
  'deathspeaker.png',
  'dragonlord.png',
  'druid.png',
  'druid_flipped.png',
  'elementalist.png',
  'enchantress.png',
  'flamecaller.png',
  'geomancer.png',
  'pathfinder.png',
  'Persecutor.png',
  'seer.png',
  'sorcerer.png',
  'sparkmage.png',
  'spellslinger.png',
  'templar.png',
  'waveshaper.png',
  'witch.png',
];

const AVATAR_TAGLINES: Record<string, string> = {
  'archimago.png': 'Your Avatar performs a smackdown of magic',
  'avatar_of_air.png': 'Your Avatar of soaring ambition',
  'avatar_of_earth.png': 'Your Avatar of enduring strength',
  'avatar_of_fire.png': 'Your Avatar of desire and destruction',
  'avatar_of_water.png': 'Your Avatar of ebb and flow',
  'battlemage.png': 'Your Avatar to win the battle and the war',
  'deathspeaker.png': 'Your Avatar turns death into dominion',
  'dragonlord.png': 'Your Avatar commands respect and fear',
  'druid.png': 'Your Avatar watches over this domain',
  'druid_flipped.png': 'Your Avatar is a force of nature!',
  'elementalist.png': 'Your Avatar of wonder and awe',
  'enchantress.png': 'Your Avatar weaves a tapestry of magic',
  'flamecaller.png': 'Your Avatar rises from the ashes to rule',
  'geomancer.png': 'Your Avatar cultivates the seeds of conquest',
  'pathfinder.png': 'Your Avatar finds the way to victory',
  'Persecutor.png': 'Your Avatar stops at nothing',
  'seer.png': 'Your Avatar prognosticates success',
  'sorcerer.png': 'Your Avatar has entered the contest!',
  'sparkmage.png': "Your Avatar's enemies are in for a shock!",
  'spellslinger.png': 'Your Avatar drafts the winning agenda',
  'templar.png': 'Your Avatar upholds an oath to prevail',
  'waveshaper.png': 'Your Avatar of ebb and flow',
  'witch.png': "Your Avatar's curses are inescapable",
};

const AVATARS = AVATAR_FILENAMES.map(file => `${GITHUB_AVATAR_BASE_URL}${file}`);

const INITIAL_MANA_THRESHOLD = 0;
const DEFAULT_STARTING_LIFE = 20;

const createInitialPlayerState = (id: number): PlayerState => ({
  id,
  avatar: `${GITHUB_AVATAR_BASE_URL}sorcerer.png`,
  life: DEFAULT_STARTING_LIFE,
  manaThreshold: INITIAL_MANA_THRESHOLD,
  manaColors: {
    earth: 0,
    fire: 0,
    water: 0,
    air: 0,
  },
});

const getTagline = (avatarUrl: string) => {
  const filename = avatarUrl.split('/').pop();
  return filename ? AVATAR_TAGLINES[filename] : '';
};

const App: React.FC = () => {
  const [player1, setPlayer1] = useState<PlayerState>(createInitialPlayerState(1));
  const [player2, setPlayer2] = useState<PlayerState>(createInitialPlayerState(2));
  const [isDiceRollerOpen, setDiceRollerOpen] = useState(false);
  const [isCodexOpen, setCodexOpen] = useState(false);
  const [isAvatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
  const [activePlayerForAvatar, setActivePlayerForAvatar] = useState<number | null>(null);
  const [isResetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [manaLayoutSwapped, setManaLayoutSwapped] = useState(false);

  // Screen Wake Lock
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          console.log('Screen Wake Lock active');
        } catch (err) {
          console.warn('Wake Lock request failed:', err);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    requestWakeLock();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  const handleReset = useCallback(() => {
    setPlayer1(prev => ({
      ...createInitialPlayerState(1),
      avatar: prev.avatar,
    }));
    setPlayer2(prev => ({
      ...createInitialPlayerState(2),
      avatar: prev.avatar,
    }));
    setResetConfirmOpen(false);
  }, []);
  
  const openAvatarSelector = (playerId: number) => {
    setActivePlayerForAvatar(playerId);
    setAvatarSelectorOpen(true);
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    if (activePlayerForAvatar === 1) {
      setPlayer1(prev => ({ ...prev, avatar: avatarUrl }));
    } else if (activePlayerForAvatar === 2) {
      setPlayer2(prev => ({ ...prev, avatar: avatarUrl }));
    }
    setAvatarSelectorOpen(false);
    setActivePlayerForAvatar(null);
  };

  return (
    <div className="relative flex flex-col h-screen w-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      <PlayerTracker 
        playerState={player1} 
        setPlayerState={setPlayer1} 
        isFlipped={true} 
        onAvatarClick={() => openAvatarSelector(1)} 
        manaLayoutSwapped={manaLayoutSwapped} 
        startingLife={DEFAULT_STARTING_LIFE} 
        tagline={getTagline(player1.avatar)}
      />

      {/* Fantasy-Themed Menu Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-2 sm:px-4 md:px-8 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 border-y-2 border-color-indigo-700-60 menu-bar-shadow py-2 h-16 sm:h-20">
        <button
          onClick={() => setResetConfirmOpen(true)}
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800-80 hover-bg-slate-700-80 border-2 border-slate-600 hover:border-indigo-500 rounded-md transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Reset Game"
        >
          <span className="font-bold text-xl sm:text-2xl">R</span>
        </button>

        <div className="flex-grow flex items-center justify-center h-full text-center pointer-events-none mx-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300 tracking-widest title-text-shadow">
            SORCERY
          </h1>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2 md:gap-4">
           <button
            onClick={() => setManaLayoutSwapped(prev => !prev)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800-80 hover-bg-slate-700-80 border-2 border-slate-600 hover:border-indigo-500 rounded-md transition-all duration-300 transform hover:scale-110 shadow-lg"
            aria-label="Swap Mana Layout"
          >
            <SwapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => setCodexOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800-80 hover-bg-slate-700-80 border-2 border-slate-600 hover:border-indigo-500 rounded-md transition-all duration-300 transform hover:scale-110 shadow-lg"
            aria-label="Open Sorcery Codex"
          >
            <CodexIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => setDiceRollerOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-slate-800-80 hover-bg-slate-700-80 border-2 border-slate-600 hover:border-indigo-500 rounded-md transition-all duration-300 transform hover:scale-110 shadow-lg"
            aria-label="Open Dice Roller"
          >
            <DiceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      <PlayerTracker 
        playerState={player2} 
        setPlayerState={setPlayer2} 
        isFlipped={false} 
        onAvatarClick={() => openAvatarSelector(2)} 
        manaLayoutSwapped={manaLayoutSwapped} 
        startingLife={DEFAULT_STARTING_LIFE} 
        tagline={getTagline(player2.avatar)}
      />

      {isDiceRollerOpen && <DiceRollerModal onClose={() => setDiceRollerOpen(false)} />}
      {isCodexOpen && <CodexModal onClose={() => setCodexOpen(false)} />}
      {isAvatarSelectorOpen && (
        <AvatarSelectorModal
          avatars={AVATARS}
          onSelect={handleAvatarSelect}
          onClose={() => setAvatarSelectorOpen(false)}
          isFlipped={activePlayerForAvatar === 1}
        />
      )}
      {isResetConfirmOpen && (
        <ConfirmationModal
          title="Reset Game"
          message="Are you sure you want to start a new game? All progress will be lost."
          onConfirm={handleReset}
          onCancel={() => setResetConfirmOpen(false)}
          confirmText="Reset"
        />
      )}
    </div>
  );
};

export default App;
