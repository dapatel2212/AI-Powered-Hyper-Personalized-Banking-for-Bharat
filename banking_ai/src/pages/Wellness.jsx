import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/Common/DashboardLayout';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function Wellness() {
  const [score, setScore] = useState(0);
  const targetScore = 68;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score < targetScore) setScore(score + 1);
    }, 20);
    return () => clearTimeout(timer);
  }, [score, targetScore]);

  const radarData = [
    { subject: 'Emergency Fund', A: 50, B: 100, fullMark: 100 },
    { subject: 'Insurance', A: 40, B: 100, fullMark: 100 },
    { subject: 'Debt', A: 80, B: 100, fullMark: 100 },
    { subject: 'Savings', A: 70, B: 100, fullMark: 100 },
    { subject: 'Goal Progress', A: 60, B: 100, fullMark: 100 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Wellness</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Score & Explanation */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-900">Wellness Score</h3>
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded font-medium">Fair</span>
            </div>
            
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="16" fill="transparent" />
                <motion.circle
                  initial={{ strokeDashoffset: 502 }}
                  animate={{ strokeDashoffset: 502 - (score / 100) * 502 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="96" cy="96" r="80"
                  stroke="#1a237e" strokeWidth="16" fill="transparent"
                  strokeDasharray="502" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-primary">{score}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 mb-2">📉 Your score dropped 8 points. Here's why:</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Emergency fund fell below 3 months of expenses.</li>
              <li>Credit card utilization increased to 45%.</li>
            </ul>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Current vs Ideal State</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Ideal" dataKey="B" stroke="#ff6f00" fill="#ff6f00" fillOpacity={0.1} />
                <Radar name="Current" dataKey="A" stroke="#1a237e" fill="#1a237e" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full opacity-50"></span>
              <span className="text-gray-600">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary rounded-full opacity-20"></span>
              <span className="text-gray-600">Ideal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Action Items */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Action Plan</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <input type="checkbox" className="mt-1 rounded text-primary" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Set up emergency fund</p>
                <p className="text-xs text-success font-medium">+15 pts</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <input type="checkbox" className="mt-1 rounded text-primary" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Review Health Insurance</p>
                <p className="text-xs text-success font-medium">+10 pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Your Badges</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">🏆</div>
              <span className="text-xs font-medium text-center text-gray-600">Debt Free</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center text-2xl">⭐</div>
              <span className="text-xs font-medium text-center text-success">Super Saver</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-50 grayscale">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl">📈</div>
              <span className="text-xs font-medium text-center text-gray-600">Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
