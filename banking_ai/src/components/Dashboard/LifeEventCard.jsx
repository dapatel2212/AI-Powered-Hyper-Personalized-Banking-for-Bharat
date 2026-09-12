import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

const EVENTS = [
  { id: 'marriage', icon: '💍', label: 'Marriage', color: 'pink' },
  { id: 'home', icon: '🏠', label: 'Home', color: 'blue' },
  { id: 'education', icon: '🎓', label: 'Education', color: 'indigo' },
  { id: 'farming', icon: '🚜', label: 'Farming', color: 'green' },
  { id: 'family', icon: '👶', label: 'Family', color: 'orange' },
];

export default function LifeEventCard() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeEvent, setActiveEvent] = useState('marriage');

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 mb-8 relative overflow-hidden"
    >
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 z-10"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <h3 className="text-xl font-bold text-gray-900 mb-6">Plan your next milestone</h3>

      <div className="flex gap-4 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {EVENTS.map(event => (
          <button
            key={event.id}
            onClick={() => setActiveEvent(event.id)}
            className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-2xl transition-all ${
              activeEvent === event.id 
                ? 'bg-primary text-white shadow-float scale-105' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{event.icon}</span>
            <span className="text-xs font-semibold">{event.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-bg rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex gap-3 items-center mb-4">
            <span className="text-xl text-primary">✦</span>
            <h4 className="font-bold text-gray-900 text-lg">Planning for {EVENTS.find(e => e.id === activeEvent)?.label.toLowerCase()}?</h4>
          </div>
          
          <p className="text-gray-600 mb-4">BankBuddy can help you:</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                <CheckIcon className="w-3 h-3" />
              </div>
              Create a savings goal
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                <CheckIcon className="w-3 h-3" />
              </div>
              Estimate required amount
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                <CheckIcon className="w-3 h-3" />
              </div>
              Plan monthly savings
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                <CheckIcon className="w-3 h-3" />
              </div>
              Explore suitable financial products
            </li>
          </ul>

          <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
            Start Planning
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
