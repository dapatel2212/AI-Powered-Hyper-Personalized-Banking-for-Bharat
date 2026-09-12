import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ExplainabilityModal from '../Common/ExplainabilityModal';

export default function RecommendationCard({ rec, onDismiss }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-float hover:-translate-y-1 transition-all duration-300 relative group"
      >
        <button 
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-secondary text-lg">✨</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Recommended for you</span>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">{rec.icon || '💳'}</div>
          <h4 className="font-bold text-gray-900 text-lg">{rec.title}</h4>
        </div>
        
        <p className="text-sm text-gray-500 mb-5 leading-relaxed min-h-[40px]">
          {rec.desc}
        </p>
        
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-gray-600">Match</span>
            <span className="text-xs font-bold text-primary">92%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 py-2.5 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors text-sm"
          >
            Why this?
          </button>
          <button className="flex-1 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors text-sm shadow-sm shadow-primary/30">
            Explore
          </button>
        </div>
      </motion.div>

      <ExplainabilityModal isOpen={showModal} onClose={() => setShowModal(false)} rec={rec} />
    </>
  );
}
