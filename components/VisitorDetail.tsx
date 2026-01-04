
import React, { useState, useEffect } from 'react';
import { SaunaSlot, Attendee, PaymentMethod } from '../types';

interface VisitorDetailProps {
  slot: SaunaSlot;
  visitorName: string;
  onUpdateSlot: (slot: SaunaSlot) => void;
  onBack: () => void;
}

const VisitorDetail: React.FC<VisitorDetailProps> = ({ slot, visitorName, onUpdateSlot, onBack }) => {
  const [myId] = useState(() => localStorage.getItem('sauna_user_id') || Math.random().toString(36).substr(2, 9));
  
  useEffect(() => {
    localStorage.setItem('sauna_user_id', myId);
  }, [myId]);

  const currentAttendee = slot.attendees.find(a => a.id === myId);
  
  const [localGuests, setLocalGuests] = useState(currentAttendee?.guests || 0);
  const [localPayment, setLocalPayment] = useState<PaymentMethod | undefined>(currentAttendee?.paymentMethod || PaymentMethod.CARD);

  const totalPeople = slot.attendees.filter(a => a.isGoing).reduce((acc, curr) => {
    if (curr.id === myId) return acc; 
    return acc + 1 + curr.guests;
  }, 0) + 1 + localGuests;

  const pricePerPerson = totalPeople > 0 ? (slot.totalCost / totalPeople).toFixed(2) : '0.00';

  const handleJoin = () => {
    let newAttendees = [...slot.attendees];
    const index = newAttendees.findIndex(a => a.id === myId);
    
    const updatedAttendee: Attendee = {
      id: myId,
      name: visitorName,
      guests: localGuests,
      isGoing: true,
      paymentMethod: localPayment
    };

    if (index > -1) {
      newAttendees[index] = updatedAttendee;
    } else {
      newAttendees.push(updatedAttendee);
    }

    onUpdateSlot({ ...slot, attendees: newAttendees });
    onBack(); 
  };

  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-[#efeff4] py-2 z-10">
        <button onClick={onBack} className="text-sm telegram-text-blue font-bold">← Back</button>
        <h2 className="text-lg font-extrabold">Banya Details</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black text-gray-800">₾{slot.totalCost}</h3>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total Cost</p>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold text-gray-800">{slot.startTime}</h3>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Start Time</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-50 flex justify-between">
           <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">📅</div>
             <span className="text-sm font-medium">{new Date(slot.date).toLocaleDateString()}</span>
           </div>
           <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500">🕒</div>
             <span className="text-sm font-medium">{slot.duration} Hours</span>
           </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
        <span className="text-xs text-gray-400 font-bold uppercase">Booking as</span>
        <span className="text-sm font-black text-blue-600">{visitorName}</span>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-5 rounded-3xl shadow-sm space-y-3">
           <div className="flex justify-between items-center">
             <span className="font-bold text-gray-700">Bringing friends?</span>
             <div className="flex items-center space-x-4">
               <button onClick={() => setLocalGuests(prev => Math.max(0, prev - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold active:bg-gray-200">-</button>
               <span className="text-lg font-bold w-4 text-center">{localGuests}</span>
               <button onClick={() => setLocalGuests(prev => prev + 1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold active:bg-gray-200">+</button>
             </div>
           </div>
           <p className="text-[10px] text-gray-400 italic">Babushka needs a head count for towels!</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs text-gray-400 uppercase font-bold tracking-widest pl-2">Payment Preference</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
             <div className="flex space-x-2">
                <button 
                  onClick={() => setLocalPayment(PaymentMethod.CARD)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${localPayment === PaymentMethod.CARD ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  💳 Card
                </button>
                <button 
                  onClick={() => setLocalPayment(PaymentMethod.CASH)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${localPayment === PaymentMethod.CASH ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400'}`}
                >
                  💵 Cash
                </button>
             </div>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-lg space-y-3 relative overflow-hidden">
           <div className="absolute -right-4 -top-4 text-6xl opacity-10">🚿</div>
           <div className="flex justify-between items-center">
             <h4 className="font-bold opacity-80 uppercase text-[10px] tracking-widest">Est. Final Amount</h4>
             <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold">LIVE CALC</span>
           </div>
           <div className="flex items-baseline space-x-2">
             <span className="text-4xl font-black">₾{pricePerPerson}</span>
             <span className="text-sm opacity-80">per head</span>
           </div>
           <div className="text-[10px] opacity-70 leading-relaxed pt-2">
             *Based on {totalPeople} participants. Babushka says: "Don't forget your flip-flops!"
           </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleJoin}
          className="w-full py-4 telegram-blue text-white font-bold rounded-2xl shadow-md active:scale-95 transition-transform text-lg"
        >
          {currentAttendee?.isGoing ? 'Update Details ✅' : 'Я иду! ✅'}
        </button>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default VisitorDetail;
