import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ShieldCheckIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function StressAlertBanner({ level = 'GREEN', score = 0 }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || level === 'GREEN') return null;

  if (level === 'RED' || level === 'ORANGE') {
    return (
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 bg-orange-50 border border-orange-100 rounded-3xl p-6 shadow-soft"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
            <HeartIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">We noticed some financial pressure.</h3>
            <p className="text-gray-600 mb-4">Let's make things easier. BankBuddy is here to support you.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="px-4 py-3 bg-white border border-orange-100 text-gray-700 font-medium rounded-xl text-sm shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex items-center gap-2">
                <span className="text-orange-500 text-lg">•</span>
                Review upcoming EMIs
              </button>
              <button className="px-4 py-3 bg-white border border-orange-100 text-gray-700 font-medium rounded-xl text-sm shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex items-center gap-2">
                <span className="text-orange-500 text-lg">•</span>
                Explore restructuring
              </button>
              <button className="px-4 py-3 bg-orange-600 text-white font-medium rounded-xl text-sm shadow-sm hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Talk to Advisor
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // YELLOW level
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="mb-8 overflow-hidden"
      >
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Your savings dipped slightly this month.</p>
              <p className="text-xs text-gray-600">Consider pausing non-essential expenses to stay on track.</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm">
              Review Budget
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 bg-white border border-amber-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-amber-50 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
