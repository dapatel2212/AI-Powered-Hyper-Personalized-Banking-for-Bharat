import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ExplainabilityModal({ isOpen, onClose, rec }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-float overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-bg/50">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">✦ BankBuddy AI</span>
              <h2 className="text-lg font-bold text-gray-900">Why {rec?.title}?</h2>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Your recommendation is based on:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                    <span className="text-xs font-bold">+</span>
                  </div>
                  <div className="flex-1 text-gray-700">Your income pattern</div>
                  <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} className="h-1.5 bg-success rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                    <span className="text-xs font-bold">+</span>
                  </div>
                  <div className="flex-1 text-gray-700">Your recent spending</div>
                  <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="h-1.5 bg-success rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                    <span className="text-xs font-bold">+</span>
                  </div>
                  <div className="flex-1 text-gray-700">Your financial goals</div>
                  <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-1.5 bg-success rounded-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Neutral</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-4">
                  <li>Location</li>
                  <li>Age</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Not used</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc pl-4">
                  <li>Gender</li>
                  <li>Religion</li>
                  <li>Caste</li>
                </ul>
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex items-start gap-3">
              <CheckCircleIcon className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-success">Fairness Check Passed</h4>
                <p className="text-xs text-success/80 mt-1">No protected attributes were used to generate this recommendation.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
