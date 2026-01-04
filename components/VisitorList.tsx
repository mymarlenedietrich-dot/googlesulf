
import React from 'react';
import { SaunaSlot } from '../types';

interface VisitorListProps {
  slots: SaunaSlot[];
  onSelectSlot: (id: string) => void;
  onBack: () => void;
}

const VisitorList: React.FC<VisitorListProps> = ({ slots, onSelectSlot, onBack }) => {
  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-[#efeff4] py-2 z-10">
        <button onClick={onBack} className="text-sm telegram-text-blue font-bold">← Home</button>
        <h2 className="text-lg font-extrabold">Available Saunas</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4">
        {slots.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center space-y-4">
             <div className="text-4xl">😴</div>
             <p className="text-gray-500 font-medium italic">Babushka is resting. <br/> Check back later for slots!</p>
          </div>
        ) : (
          slots.map(slot => {
            const totalPeople = slot.attendees.filter(a => a.isGoing).reduce((acc, curr) => acc + 1 + curr.guests, 0);
            return (
              <button 
                key={slot.id} 
                onClick={() => onSelectSlot(slot.id)}
                className="w-full text-left bg-white p-5 rounded-3xl shadow-sm border border-transparent active:border-blue-300 transition-all flex justify-between items-center"
              >
                <div>
                  <div className="text-lg font-bold">{new Date(slot.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                  <div className="text-sm text-gray-500">{slot.startTime} • {slot.duration} hours</div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-xs font-bold telegram-text-blue">{totalPeople} people</div>
                   <div className="text-[10px] text-gray-400">Tap to join &rarr;</div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
        <div className="flex space-x-3">
          <div className="text-lg">📢</div>
          <div className="text-xs text-yellow-800 leading-tight">
            Final price is calculated 2 hours before the start! Don't be late or Babushka will be sad.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorList;
