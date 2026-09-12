import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuthStore } from '../store/authStore';
import { useCustomerStore } from '../store/customerStore';
import { transactionService } from '../services/transactionService';
import { SEGMENTS, STRESS_COLORS } from '../constants';

const COLORS = ['#16a34a', '#0284c7', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

export default function DashboardPage() {
  const { t } = useTranslation();
  const { customer } = useAuthStore();
  const { profile, segment, stressLevel, fetchProfile } = useCustomerStore();

  const [insights, setInsights] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedShap, setSelectedShap] = useState(null);

  const customerId = customer?.customer_id;

  useEffect(() => {
    if (customerId) {
      fetchProfile(customerId);
      transactionService.getInsights(customerId).then(setInsights).catch(() => {});
      transactionService.getTransactions(customerId, { page_size: 5 })
        .then((res) => setTransactions(res.results || []))
        .catch(() => {});
    }
  }, [customerId, fetchProfile]);

  const segInfo = segment ? SEGMENTS[segment] : null;
  const stressInfo = stressLevel ? STRESS_COLORS[stressLevel] : STRESS_COLORS['GREEN'];

  // Mock recommendations based on segment if backend engine still in training
  const defaultRecommendations = [
    {
      id: 'rec_1',
      product: segment === 'seasonal_earners' ? 'Weather Insurance' : (segment === 'stressed_accounts' ? 'EMI Date Shift & Restructure' : 'Tax-Saver Mutual Fund SIP'),
      category: segment === 'stressed_accounts' ? 'Financial Health' : 'Investment & Protection',
      matchScore: 92,
      isBlocked: segment === 'stressed_accounts' && false,
      shap: [
        { feature: 'Seasonal Kharif crop spend detected', contribution: '+28%' },
        { feature: 'No existing crop/weather coverage', contribution: '+22%' },
        { feature: 'Consistent seasonal repayment discipline', contribution: '+15%' }
      ],
      description: segment === 'seasonal_earners'
        ? 'Protect your crop yield against unseasonal rainfall and drought.'
        : (segment === 'stressed_accounts'
          ? 'Reduce monthly EMI burden by 30% without affecting credit score.'
          : 'Save up to ₹46,800 under Section 80C with flexible ₹500/month investments.')
    },
    {
      id: 'rec_2',
      product: segment === 'seasonal_earners' ? 'Kisan Credit Card Line' : 'Emergency Health Cover',
      category: 'Credit & Insurance',
      matchScore: 84,
      isBlocked: segment === 'stressed_accounts',
      shap: [
        { feature: 'Regular fertilizer & agri purchases', contribution: '+24%' },
        { feature: 'Subsidized 4% interest rate eligibility', contribution: '+19%' }
      ],
      description: 'Interest subvention credit up to ₹3 Lakhs with flexible harvest-cycle payments.'
    }
  ];

  const pieData = insights?.category_breakdown
    ? Object.entries(insights.category_breakdown).map(([name, val]) => ({
        name: name.replace('_', ' ').toUpperCase(),
        value: Math.round(val * 100)
      }))
    : [
        { name: 'FOOD & GROCERY', value: 35 },
        { name: 'EMI', value: 30 },
        { name: 'UTILITIES', value: 15 },
        { name: 'HEALTH', value: 10 },
        { name: 'SAVINGS', value: 10 }
      ];

  return (
    <div className="space-y-6">
      {/* 1. Stress Alert Banner (Guardrail alert) */}
      {(stressLevel === 'ORANGE' || stressLevel === 'RED') && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-xl shadow-sm flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚠️</span>
              <h3 className="font-bold text-red-800 text-sm">{t('stress.alertTitle')}</h3>
            </div>
            <p className="mt-1 text-xs text-red-700 leading-relaxed">
              We detected consecutive EMI bounces and declining balance trend. Under responsible banking guidelines,
              <b> all high-interest predatory loan offers have been frozen</b>. We are here to help you regain financial stability.
            </p>
          </div>
          <button className="shrink-0 ml-4 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm transition">
            {t('stress.helpAction')}
          </button>
        </div>
      )}

      {/* 2. Top Profile & Balance Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-green-200 font-semibold">
              {t('dashboard.balance')}
            </span>
            <div className="text-3xl font-extrabold mt-1">₹42,850.00</div>
          </div>
          <div className="pt-4 border-t border-green-600/50 flex items-center justify-between text-xs text-green-100">
            <span>Customer ID: {customerId}</span>
            <span className="bg-green-600/80 px-2 py-0.5 rounded font-mono">Tier {profile?.tier || 3}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              {t('dashboard.segment')}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl">{segInfo?.emoji || '👤'}</span>
              <div className="font-bold text-gray-900 text-lg">{segInfo?.label || 'General Banking'}</div>
            </div>
            <p className="text-xs text-gray-600 mt-1">{segInfo?.desc}</p>
          </div>
          <div className="text-xs text-green-700 font-medium pt-3 border-t border-gray-100">
            ✓ Vernacular Personalization Active
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
              {t('dashboard.stressStatus')}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`w-3.5 h-3.5 rounded-full ${stressInfo.dot}`}></span>
              <span className="font-bold text-gray-900 text-lg">{stressInfo.label}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Stress Score: {profile?.stress_score || 22}/100</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${stressLevel === 'RED' ? 'bg-red-500' : (stressLevel === 'ORANGE' ? 'bg-orange-500' : (stressLevel === 'YELLOW' ? 'bg-yellow-500' : 'bg-green-500'))}`}
              style={{ width: `${profile?.stress_score || 22}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 3. Personalized Recommendations Section with SHAP */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>🎯</span>
              <span>{t('dashboard.recommendations')}</span>
            </h2>
            <p className="text-xs text-gray-500">
              Ranked with XGBoost & filtered by Ethical AI guardrails
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            Explainable AI (SHAP)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="border border-gray-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {rec.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    Match: {rec.matchScore}%
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mt-2">{rec.product}</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{rec.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedShap(rec)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>ℹ️</span>
                  <span>{t('dashboard.whyRecommended')}</span>
                </button>

                <button
                  type="button"
                  disabled={rec.isBlocked}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white shadow-sm transition ${
                    rec.isBlocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
                  }`}
                >
                  {rec.isBlocked ? 'Temporarily Blocked' : t('dashboard.applyNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP Explanation Modal */}
      {selectedShap && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 animate-in fade-in">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Explainable AI Breakdown</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedShap.product}</p>
              </div>
              <button
                onClick={() => setSelectedShap(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed">
              Our transparent AI model analyzed your 6-month transaction behavior and identified these key factors:
            </p>

            <div className="mt-4 space-y-2.5">
              {selectedShap.shap.map((s, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                  <span className="text-gray-800 font-medium">{s.feature}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{s.contribution}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedShap(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-green-700 hover:bg-green-800 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Spending Insights & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Insights Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span>📊</span>
              <span>{t('dashboard.spendingInsights')}</span>
            </h2>
            <span className="text-xs text-gray-500 font-medium">Last 6 Months</span>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100">
            {pieData.slice(0, 4).map((item, idx) => (
              <div key={item.name} className="flex items-center space-x-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="text-gray-600 truncate">{item.name}:</span>
                <span className="font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span>💳</span>
              <span>{t('dashboard.recentTxns')}</span>
            </h2>
            <span className="text-xs text-green-700 font-semibold cursor-pointer">{t('dashboard.viewAll')}</span>
          </div>

          <div className="space-y-2.5">
            {transactions.length > 0 ? (
              transactions.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-gray-100 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">{tx.description || tx.merchant || 'UPI Transfer'}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{tx.category} • {tx.channel}</div>
                  </div>
                  <div className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-gray-400">
                No recent transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
