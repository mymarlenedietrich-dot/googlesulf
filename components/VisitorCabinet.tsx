
import React from 'react';
import { SaunaSlot } from '../types';

interface VisitorCabinetProps {
  name: string;
  slots: SaunaSlot[];
  onFindSlots: () => void;
  onSelectSlot: (id: string) => void;
  onBack: () => void;
  onResetName: () => void;
}

const VisitorCabinet: React.FC<VisitorCabinetProps> = ({ name, slots, onFindSlots, onSelectSlot, onBack, onResetName }) => {
  // We need to know which device/ID we are, for demo we just use name or find entries with our name
  // Note: in a real app we'd use a unique ID. Here we'll show slots where an attendee has this name.
  const myJoinedSlots = slots.filter(s => s.attendees.some(a => a.name === name && a.isGoing));

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-[#efeff4] py-2 z-10">
        <button onClick={onBack} className="text-sm telegram-text-blue font-bold">← Home</button>
        <h2 className="text-lg font-extrabold">My Cabinet 🧖‍♂️</h2>
        <button onClick={onResetName} className="text-[10px] text-gray-400 font-bold uppercase">Change Name</button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center space-x-4 border border-gray-50">
         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl">🧘‍♂️</div>
         <div>
            <h3 className="text-sm text-gray-400 font-bold uppercase tracking-tight">Welcome back,</h3>
            <p className="text-2xl font-black text-gray-800">{name}!</p>
         </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs text-gray-400 uppercase font-bold tracking-widest pl-2">My Upcoming Steam</h3>
        {myJoinedSlots.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center border border-dashed border-gray-200">
             <p className="text-gray-400 text-sm font-medium">You haven't joined any banya sessions yet.</p>
          </div>
        ) : (
          myJoinedSlots.map(slot => (
            <button 
              key={slot.id} 
              onClick={() => onSelectSlot(slot.id)}
              className="w-full text-left bg-blue-50 p-5 rounded-3xl border border-blue-100 flex justify-between items-center active:scale-[0.98] transition-all"
            >
              <div>
                <div className="text-lg font-bold text-blue-900">{new Date(slot.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                <div className="text-sm text-blue-700">{slot.startTime} • {slot.duration}h</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-blue-600">Joined ✅</div>
                <div className="text-[10px] text-blue-400">Manage &rarr;</div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="pt-4">
        <button 
          onClick={onFindSlots}
          className="w-full py-5 telegram-blue text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          <span className="text-xl">🔍</span>
          <span>Find Available Banya</span>
        </button>
      </div>

      <div className="text-center p-6 bg-green-50 rounded-3xl border border-green-100">
         <p className="text-xs text-green-700 font-medium">
            "A steam today keeps the doctor away!" <br/> — Babushka's Wisdom
         </p>
      </div>
    </div>
  );
};

export default VisitorCabinet;
