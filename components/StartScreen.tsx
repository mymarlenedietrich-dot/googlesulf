
import React from 'react';
import { ViewState } from '../types';

interface StartScreenProps {
  onSelectView: (view: ViewState) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onSelectView }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-500">
      <div className="mt-10 mb-2">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto ring-4 ring-blue-100">
          <img 
            src="https://picsum.photos/seed/banya_babushka_steam/400/400" 
            alt="Babushka in Sauna" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Banya with Babushka</h1>
        <p className="text-gray-500 font-medium">Georgia's finest steam coordination!</p>
      </div>

      <div className="w-full space-y-4 pt-4">
        <button 
          onClick={() => onSelectView('ORGANIZER_AUTH')}
          className="w-full py-4 bg-white text-gray-800 font-bold rounded-2xl shadow-sm border border-gray-200 active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          <span className="text-xl">🐸</span>
          <span>Organizer (Жаба)</span>
        </button>
        
        <button 
          onClick={() => onSelectView('VISITOR_LIST')}
          className="w-full py-4 telegram-blue text-white font-bold rounded-2xl shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          <span className="text-xl">🧖‍♂️</span>
          <span>Visitor</span>
        </button>
      </div>

      <div className="text-xs text-gray-400 mt-10 italic">
        "Pure steam, pure Lari, happy heart!"
      </div>
    </div>
  );
};

export default StartScreen;
