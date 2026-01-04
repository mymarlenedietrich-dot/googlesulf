
import React, { useState } from 'react';

interface VisitorOnboardingProps {
  onComplete: (name: string) => void;
  onBack: () => void;
}

const VisitorOnboarding: React.FC<VisitorOnboardingProps> = ({ onComplete, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col justify-center animate-in slide-in-from-bottom duration-300">
      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600">
        &larr; Back
      </button>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg space-y-6 text-center border border-gray-100">
        <div className="text-5xl">🧖‍♀️</div>
        <h2 className="text-xl font-black">Welcome, Friend!</h2>
        <p className="text-sm text-gray-500 font-medium">Babushka needs to know who you are so she can prepare the steam.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            className="w-full p-4 bg-gray-50 rounded-xl text-center text-xl font-bold focus:ring-2 focus:ring-blue-300 outline-none transition-all border border-transparent focus:border-blue-200"
          />
          <button 
            type="submit"
            className="w-full py-4 telegram-blue text-white font-bold rounded-xl active:scale-95 transition-transform"
          >
            Enter Cabinet
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorOnboarding;
