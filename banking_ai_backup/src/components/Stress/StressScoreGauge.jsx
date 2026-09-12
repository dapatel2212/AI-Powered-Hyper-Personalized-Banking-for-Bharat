import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function StressScoreGauge({ score = 0, level = 'GREEN' }) {
  const { t } = useTranslation();
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColors = () => {
    switch(level) {
      case 'GREEN': return { stroke: '#2e7d32', bg: '#e8f5e9', text: 'text-success' };
      case 'YELLOW': return { stroke: '#ff8f00', bg: '#fff8e1', text: 'text-warning' };
      case 'ORANGE': return { stroke: '#f57c00', bg: '#fff3e0', text: 'text-orange-600' };
      case 'RED': return { stroke: '#c62828', bg: '#ffebee', text: 'text-danger' };
      default: return { stroke: '#2e7d32', bg: '#e8f5e9', text: 'text-success' };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={colors.bg}
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="80"
            cy="80"
            r={radius}
            stroke={colors.stroke}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">Score</span>
        </div>
      </div>
      <p className={`text-xl font-bold mt-4 ${colors.text}`}>
        {t(`profile.stressLevels.${level.toLowerCase()}`)}
      </p>
      <p className="text-sm text-gray-500 text-center mt-2 max-w-xs">
        {level === 'GREEN' && "Your financial health is stable. Keep up the good work!"}
        {level === 'YELLOW' && "Your savings pattern changed slightly. We can help you adjust your budget."}
        {level === 'ORANGE' && "We noticed some financial pressure. BankBuddy is here to support you."}
        {level === 'RED' && "It seems like a tough month. Let's explore some options to ease the pressure."}
      </p>
    </div>
  );
}
