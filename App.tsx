
import React, { useState, useEffect } from 'react';
import { ViewState, SaunaSlot, Attendee } from './types';
import StartScreen from './components/StartScreen';
import OrganizerAuth from './components/OrganizerAuth';
import OrganizerDashboard from './components/OrganizerDashboard';
import VisitorList from './components/VisitorList';
import VisitorDetail from './components/VisitorDetail';
import VisitorOnboarding from './components/VisitorOnboarding';
import VisitorCabinet from './components/VisitorCabinet';

const STORAGE_KEY = 'sauna_organizer_slots';
const USER_NAME_KEY = 'sauna_visitor_name';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('START');
  const [slots, setSlots] = useState<SaunaSlot[]>([]);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState<string>(() => localStorage.getItem(USER_NAME_KEY) || '');

  // Load slots
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved slots", e);
      }
    }
  }, []);

  // Save slots
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  // Save visitor name
  useEffect(() => {
    localStorage.setItem(USER_NAME_KEY, visitorName);
  }, [visitorName]);

  const addSlot = (newSlot: SaunaSlot) => {
    setSlots([...slots, newSlot]);
    setView('ORGANIZER_DASHBOARD');
  };

  const updateSlot = (updatedSlot: SaunaSlot) => {
    setSlots(slots.map(s => s.id === updatedSlot.id ? updatedSlot : s));
  };

  const deleteSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleVisitorEnter = () => {
    if (!visitorName) {
      setView('VISITOR_ONBOARDING');
    } else {
      setView('VISITOR_CABINET');
    }
  };

  const currentSlot = slots.find(s => s.id === activeSlotId);

  return (
    <div className="min-h-screen max-w-md mx-auto relative pb-10">
      {view === 'START' && (
        <StartScreen onSelectView={(v) => v === 'VISITOR_LIST' ? handleVisitorEnter() : setView(v)} />
      )}

      {view === 'ORGANIZER_AUTH' && (
        <OrganizerAuth 
          onSuccess={() => setView('ORGANIZER_DASHBOARD')} 
          onBack={() => setView('START')} 
        />
      )}

      {view === 'ORGANIZER_DASHBOARD' && (
        <OrganizerDashboard 
          slots={slots}
          onAddSlot={addSlot}
          onDeleteSlot={deleteSlot}
          onBack={() => setView('START')}
        />
      )}

      {view === 'VISITOR_ONBOARDING' && (
        <VisitorOnboarding 
          onComplete={(name) => {
            setVisitorName(name);
            setView('VISITOR_CABINET');
          }}
          onBack={() => setView('START')}
        />
      )}

      {view === 'VISITOR_CABINET' && (
        <VisitorCabinet 
          name={visitorName}
          slots={slots}
          onFindSlots={() => setView('VISITOR_LIST')}
          onSelectSlot={(id) => {
            setActiveSlotId(id);
            setView('VISITOR_DETAIL');
          }}
          onBack={() => setView('START')}
          onResetName={() => {
            setVisitorName('');
            setView('VISITOR_ONBOARDING');
          }}
        />
      )}

      {view === 'VISITOR_LIST' && (
        <VisitorList 
          slots={slots} 
          onSelectSlot={(id) => {
            setActiveSlotId(id);
            setView('VISITOR_DETAIL');
          }}
          onBack={() => setView('VISITOR_CABINET')}
        />
      )}

      {view === 'VISITOR_DETAIL' && currentSlot && (
        <VisitorDetail 
          slot={currentSlot}
          visitorName={visitorName}
          onUpdateSlot={updateSlot}
          onBack={() => setView('VISITOR_LIST')}
        />
      )}
    </div>
  );
};

export default App;
