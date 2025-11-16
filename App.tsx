
import React, { useState, useCallback } from 'react';
import { PlayerState } from './types';
import { PlayerTracker } from './components/PlayerTracker';
import { DiceRollerModal } from './components/DiceRollerModal';
import { AvatarSelectorModal } from './components/AvatarSelectorModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { CodexModal } from './components/CodexModal';
import { DiceIcon, ResetIcon, SwapIcon, CodexIcon } from './components/Icons';

const AVATARS = [
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/archimago.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_air.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_earth.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_fire.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/avatar_of_water.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/battlemage.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/deathspeaker.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/dragonlord.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/druid.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/elementalist.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/enchantress.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/flamecaller.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/geomancer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/pathfinder.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/seer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/sorcerer.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/sparkmage.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/spellslinger.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/templar.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/waveshaper.png',
  'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/witch.png',
];

const STARTING_LIFE = 20;
const INITIAL_MANA_THRESHOLD = 0;

const createInitialPlayerState = (id: number): PlayerState => ({
  id,
  avatar: 'https://raw.githubusercontent.com/themitchnz/sorcery_tracker/main/archimago.png',
  life: STARTING_LIFE,
  manaThreshold: INITIAL_MANA_THRESHOLD,
  manaColors: {
    earth: 0,
    fire: 0,
    water: 0,
    air: 0,
  },
});

const App: React.FC = () => {
  const [player1, setPlayer1] = useState<PlayerState>(createInitialPlayerState(1));
  const [player2, setPlayer2] = useState<PlayerState>(createInitialPlayerState(2));
  const [isDiceRollerOpen, setDiceRollerOpen] = useState(false);
  const [isCodexOpen, setCodexOpen] = useState(false);
  const [isAvatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
  const [activePlayerForAvatar, setActivePlayerForAvatar] = useState<number | null>(null);
  const [isResetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [manaLayoutSwapped, setManaLayoutSwapped] = useState(false);

  const handleReset = useCallback(() => {
    setPlayer1(createInitialPlayerState(1));
    setPlayer2(createInitialPlayerState(2));
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
      <PlayerTracker playerState={player1} setPlayerState={setPlayer1} isFlipped={true} onAvatarClick={() => openAvatarSelector(1)} manaLayoutSwapped={manaLayoutSwapped} startingLife={STARTING_LIFE} />

      <div className="flex-shrink-0 flex items-center justify-between px-4 md:px-8 bg-black bg-opacity-20 border-y-2 border-slate-700 shadow-lg py-2">
        <button
          onClick={() => setResetConfirmOpen(true)}
          className="p-3 bg-red-800 hover:bg-red-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
          aria-label="Reset Game"
        >
          <ResetIcon className="w-6 h-6" />
        </button>
        <h1 className="font-cinzel text-2xl md:text-4xl font-bold text-amber-300 tracking-widest">
          SORCERY
        </h1>
        <div className="flex items-center gap-2 md:gap-4">
           <button
            onClick={() => setManaLayoutSwapped(prev => !prev)}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md ${manaLayoutSwapped ? 'bg-teal-500' : 'bg-teal-700 hover:bg-teal-600'}`}
            aria-label="Swap Mana Layout"
          >
            <SwapIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCodexOpen(true)}
            className="p-3 bg-purple-800 hover:bg-purple-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
            aria-label="Open Sorcery Codex"
          >
            <CodexIcon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setDiceRollerOpen(true)}
            className="p-3 bg-indigo-700 hover:bg-indigo-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md"
            aria-label="Open Dice Roller"
          >
            <DiceIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <PlayerTracker playerState={player2} setPlayerState={setPlayer2} isFlipped={false} onAvatarClick={() => openAvatarSelector(2)} manaLayoutSwapped={manaLayoutSwapped} startingLife={STARTING_LIFE} />

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
