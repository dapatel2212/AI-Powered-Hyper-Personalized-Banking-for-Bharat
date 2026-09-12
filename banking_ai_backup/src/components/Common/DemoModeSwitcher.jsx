import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, ChevronUpIcon, CheckIcon } from '@heroicons/react/24/outline';
import useAppStore from '../../store/useAppStore';

const PROFILES = [
  { id: 'ramesh', name: 'Ramesh Kumar', desc: 'Seasonal Earner', lang: 'hi', stress: 'GREEN' },
  { id: 'priya', name: 'Priya Sharma', desc: 'Prudent Saver', lang: 'ta', stress: 'GREEN' },
  { id: 'suresh', name: 'Suresh Patel', desc: 'Digital Native', lang: 'hi', stress: 'YELLOW' },
  { id: 'arjun', name: 'Arjun Singh', desc: 'Gig Worker', lang: 'en', stress: 'GREEN' },
  { id: 'meena', name: 'Meena Devi', desc: 'Financial Stress', lang: 'mr', stress: 'ORANGE' },
];

export default function DemoModeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('ramesh');
  const setStressLevel = useAppStore(state => state.setStressLevel);

  const activeProfile = PROFILES.find(p => p.id === activeId);

  const handleSelect = (profile) => {
    setActiveId(profile.id);
    setIsOpen(false);
    
    // Simulate updating app state based on profile
    // Here we just update stress for now as an example of changing state.
    if(profile.stress === 'GREEN') setStressLevel(85);
    if(profile.stress === 'YELLOW') setStressLevel(65);
    if(profile.stress === 'ORANGE') setStressLevel(40);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 leading-none">{activeProfile.name}</p>
            <p className="text-xs text-gray-500 mt-1">{activeProfile.desc}</p>
          </div>
        </div>
        <ChevronUpIcon className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-float border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">🎬 Demo Mode</span>
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {PROFILES.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${activeId === p.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                >
                  <div>
                    <p className={`text-sm ${activeId === p.id ? 'font-semibold text-primary' : 'font-medium text-gray-700'}`}>
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">{p.desc} • {p.stress}</p>
                  </div>
                  {activeId === p.id && <CheckIcon className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
