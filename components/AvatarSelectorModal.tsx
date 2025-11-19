
import React from 'react';

interface AvatarSelectorModalProps {
  avatars: string[];
  onSelect: (avatarUrl: string) => void;
  onClose: () => void;
  isFlipped?: boolean;
}

export const AvatarSelectorModal: React.FC<AvatarSelectorModalProps> = ({ avatars, onSelect, onClose, isFlipped }) => {
  const transformClass = isFlipped ? 'rotate-180' : '';
  
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={onClose}
    >
      <div 
        className={`bg-slate-800 border-2 border-indigo-400 rounded-lg p-6 shadow-2xl w-11/12 max-w-2xl flex flex-col items-center gap-4 animate-fade-in ${transformClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl text-indigo-300 mb-4">Choose Your Avatar</h2>

        <div className="w-full max-h-[50vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {avatars.map((avatar, index) => (
              <button 
                key={`avatar-${index}`} 
                onClick={() => onSelect(avatar)}
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent hover:border-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 transform hover:scale-105"
              >
                <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
         <button
          onClick={onClose}
          className="mt-6 w-1/2 p-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};