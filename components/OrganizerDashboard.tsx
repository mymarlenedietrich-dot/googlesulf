
import React, { useState } from 'react';
import { SaunaSlot } from '../types';

interface OrganizerDashboardProps {
  slots: SaunaSlot[];
  onAddSlot: (slot: SaunaSlot) => void;
  onDeleteSlot: (id: string) => void;
  onBack: () => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ slots, onAddSlot, onDeleteSlot, onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: 2,
    totalCost: 150
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: SaunaSlot = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      attendees: [],
    };
    onAddSlot(newSlot);
    setShowForm(false);
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-[#efeff4] py-2 z-10">
        <button onClick={onBack} className="text-sm telegram-text-blue font-bold">← Home</button>
        <h2 className="text-lg font-extrabold">Organizer Board 🐸</h2>
        <div className="w-10"></div>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 border border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">New Banya Slot</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Date</label>
              <input 
                type="date" required 
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Start Time</label>
              <input 
                type="time" required 
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                value={formData.startTime}
                onChange={e => setFormData({...formData, startTime: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Hours</label>
                <input 
                  type="number" min="1" required 
                  className="w-full p-3 bg-gray-50 rounded-xl text-center outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1 uppercase font-bold tracking-wider">Total Cost (₾)</label>
                <input 
                  type="number" min="1" required 
                  className="w-full p-3 bg-gray-50 rounded-xl text-center outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.totalCost}
                  onChange={e => setFormData({...formData, totalCost: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 text-gray-500 font-bold rounded-xl">Cancel</button>
              <button type="submit" className="flex-1 py-3 telegram-blue text-white font-bold rounded-xl shadow-md">Create</button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-white border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-colors"
        >
          + Add New Banya Slot
        </button>
      )}

      <div className="space-y-4">
        <h3 className="text-xs text-gray-400 uppercase font-bold tracking-widest pl-2">Active Slots</h3>
        {slots.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center text-gray-400 text-sm">
            No banya planned yet. <br/> Get it started!
          </div>
        ) : (
          slots.map(slot => (
            <div key={slot.id} className="bg-white p-5 rounded-3xl shadow-sm relative border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-lg font-bold">{new Date(slot.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                  <div className="text-sm text-gray-500 font-medium">{slot.startTime} • {slot.duration}h • ₾{slot.totalCost}</div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full mb-1 uppercase">
                      {slot.attendees.filter(a => a.isGoing).reduce((acc, curr) => acc + 1 + curr.guests, 0)} Joined
                    </span>
                    <button 
                      onClick={() => onDeleteSlot(slot.id)}
                      className="text-red-400 text-xs mt-2 hover:text-red-600"
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
