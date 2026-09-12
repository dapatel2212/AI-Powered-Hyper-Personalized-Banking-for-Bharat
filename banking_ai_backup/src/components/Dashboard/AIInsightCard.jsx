import { motion } from 'framer-motion';

export default function AIInsightCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary to-indigo-900 rounded-2xl p-6 text-white shadow-float relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="text-8xl">✦</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-secondary text-xl">✨</span>
          <h3 className="font-semibold text-lg">AI Insight</h3>
        </div>
        <p className="text-primary-50 text-base leading-relaxed mb-4 max-w-lg">
          "You spent 18% less on food this month. If this trend continues, you could save approximately ₹2,400 more this month."
        </p>
        <button className="text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg backdrop-blur-sm">
          How did AI calculate this?
        </button>
      </div>
    </motion.div>
  );
}
