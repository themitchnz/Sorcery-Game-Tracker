
import React from 'react';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel' 
}) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
        onClick={onCancel}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-slate-800 border-2 border-indigo-400 rounded-lg p-6 shadow-2xl w-11/12 max-w-md flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl text-indigo-300">{title}</h2>
        <p className="text-slate-300 mt-2 text-lg">{message}</p>
        
        <div className="flex justify-around w-full mt-4 gap-4">
            <button
              onClick={onCancel}
              className="w-full p-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="w-full p-3 bg-red-800 hover:bg-red-700 rounded-lg font-bold text-lg transition-colors"
            >
              {confirmText}
            </button>
        </div>
      </div>
    </div>
  );
};