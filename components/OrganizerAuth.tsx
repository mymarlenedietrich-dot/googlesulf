
import React, { useState } from 'react';

interface OrganizerAuthProps {
  onSuccess: () => void;
  onBack: () => void;
}

const OrganizerAuth: React.FC<OrganizerAuthProps> = ({ onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '555') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col justify-center animate-in slide-in-from-bottom duration-300">
      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600">
        &larr; Back
      </button>
      
      <div className="bg-white p-8 rounded-3xl shadow-lg space-y-6 text-center">
        <div className="text-4xl">🔐</div>
        <h2 className="text-xl font-bold">Organizer Login</h2>
        <p className="text-sm text-gray-500">Only Babushka's favorites allowed.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className={`w-full p-4 bg-gray-100 rounded-xl text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-400 outline-none transition-all ${error ? 'border-2 border-red-500 animate-bounce' : ''}`}
          />
          <button 
            type="submit"
            className="w-full py-4 telegram-blue text-white font-bold rounded-xl active:scale-95 transition-transform"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizerAuth;
