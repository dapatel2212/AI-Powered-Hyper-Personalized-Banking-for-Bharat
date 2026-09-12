import { motion } from 'framer-motion';

export default function FinancialHealthCard({ score = 82, trend = 6 }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft flex items-center gap-6 border border-gray-100 relative overflow-hidden group hover:shadow-float transition-shadow duration-300">
      <div className="absolute top-4 right-4 text-xs font-medium text-gray-400 flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
        <span>✦ BankBuddy AI</span>
      </div>

      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            className="text-success"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 leading-none">{score}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Financial Health</h3>
        <p className="text-sm font-medium text-success flex items-center gap-1 mb-2">
          ↑ {trend}% from last month
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
          <strong className="font-semibold text-gray-700">AI analysis:</strong> Your spending is stable and your savings pattern has improved this month.
        </p>
      </div>
    </div>
  );
}
