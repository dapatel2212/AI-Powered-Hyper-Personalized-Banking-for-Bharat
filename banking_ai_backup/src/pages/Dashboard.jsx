import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../components/Common/DashboardLayout';
import RecommendationCard from '../components/Dashboard/RecommendationCard';
import StressAlertBanner from '../components/Stress/StressAlertBanner';
import LifeEventCard from '../components/Dashboard/LifeEventCard';
import AIInsightCard from '../components/Dashboard/AIInsightCard';
import FinancialHealthCard from '../components/Dashboard/FinancialHealthCard';
import useAppStore from '../store/useAppStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const { t } = useTranslation();
  const { customer, widgets } = useAppStore();

  const [recommendations, setRecommendations] = useState([
    { id: 1, title: 'Weather Insurance', desc: 'Based on your savings pattern', detail: 'Premium ₹500/mo', icon: '🌦️' },
    { id: 2, title: 'Kisan Credit Card', desc: 'Increase your limit', detail: 'Up to ₹3 Lakhs', icon: '💳' },
    { id: 3, title: 'Fixed Deposit', desc: 'Safe returns on surplus', detail: 'Earn 7.1% p.a.', icon: '🏦' }
  ]);

  const handleDismissRec = (id) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  const spendingData = [
    { name: 'Agriculture', value: 400 },
    { name: 'Household', value: 300 },
    { name: 'EMI', value: 300 },
    { name: 'Fuel', value: 200 },
  ];
  const COLORS = ['#2e7d32', '#1a237e', '#c62828', '#ff8f00'];

  const emis = [
    { name: 'Tractor Loan', amount: '₹8,500', date: '5th Oct' },
    { name: 'Home Loan', amount: '₹12,000', date: '10th Oct' }
  ];

  return (
    <DashboardLayout>
      <StressAlertBanner level={customer.stressLevel} score={customer.stressLevel === 'GREEN' ? 22 : customer.stressLevel === 'YELLOW' ? 45 : customer.stressLevel === 'ORANGE' ? 72 : 90} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, {customer.name} 👋</h1>
        <p className="text-gray-500">Your financial health is looking good today.</p>
      </motion.div>
      
      {widgets.includes('recommendations') && <LifeEventCard />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FinancialHealthCard score={82} trend={6} />
        <AIInsightCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quick Balance */}
        <div className="bg-primary text-white rounded-2xl p-6 shadow-soft relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl">₹</span>
          </div>
          <h3 className="text-primary-100 mb-2 opacity-80">{t('dashboard.quickBalance')}</h3>
          <p className="text-3xl font-bold">₹ {customer.balance.toLocaleString('en-IN')}.00</p>
        </div>
        
        {/* Quick Actions */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
          <h3 className="text-gray-900 font-semibold mb-4">{t('dashboard.quickActions')}</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['cropLoan', 'weatherInsurance', 'kisanCredit'].map((action) => (
              <button key={action} className="whitespace-nowrap px-4 py-2 bg-gray-50 text-gray-700 font-medium rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm">
                {t(`dashboard.farmerActions.${action}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {widgets.includes('spending') || widgets.includes('savings') ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Spending Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-4">{t('dashboard.spendingInsights')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={spendingData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming EMIs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-4">{t('dashboard.upcomingEmis')}</h3>
            <div className="space-y-4">
              {emis.map((emi, i) => (
                <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{emi.name}</p>
                    <p className="text-sm text-gray-500">Due on {emi.date}</p>
                  </div>
                  <p className="font-bold text-danger">{emi.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Recommendations */}
      {widgets.includes('recommendations') && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.recommendations')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {recommendations.map(rec => (
                <RecommendationCard key={rec.id} rec={rec} onDismiss={() => handleDismissRec(rec.id)} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
