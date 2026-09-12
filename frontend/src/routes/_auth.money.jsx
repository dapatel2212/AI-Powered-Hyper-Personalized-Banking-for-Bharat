import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts'
import { useDemoStore } from '../store/useDemoStore'
import { getTransactionsData, getMoneyFlowTrends } from '../services/mockAdapters'

export const Route = createFileRoute('/_auth/money')({
  component: MoneyPage,
})

function MoneyPage() {
  const { activeProfile } = useDemoStore()
  const [range, setRange] = useState('3M')
  const [transactions, setTransactions] = useState([])
  const [trends, setTrends] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    getTransactionsData(activeProfile.id).then(setTransactions)
    setTrends(getMoneyFlowTrends(activeProfile.id, range))
  }, [activeProfile.id, range])

  const monthlyIncome = activeProfile.monthlyIncome
  const monthlyExpense = Math.round(monthlyIncome * (1 - activeProfile.savingsRate / 100))
  const monthlySavings = monthlyIncome - monthlyExpense

  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === 'credit') return tx.type === 'credit'
    if (activeFilter === 'debit') return tx.type === 'debit'
    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Money Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cash Flow, Expenditure Insights & Transaction Records
          </p>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl self-start">
          {['1M', '3M', '6M'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                range === r
                  ? 'bg-indigo-900 dark:bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Inflow (Monthly)
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            ₹{monthlyIncome.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] font-bold text-green-600 dark:text-green-400 mt-1 inline-block">
            Verified Regular
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Outflow (Monthly)
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            ₹{monthlyExpense.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-1 inline-block">
            Essentials + Obligations
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Net Monthly Surplus
          </span>
          <div className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-400 mt-2">
            ₹{monthlySavings.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-1 inline-block">
            {activeProfile.savingsRate}% Savings Ratio
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Active EMI Total
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            {activeProfile.upcomingEmi ? `₹${activeProfile.upcomingEmi.toLocaleString('en-IN')}` : '₹0'}
          </div>
          <span className="text-[10px] font-bold text-slate-500 mt-1 inline-block">
            {activeProfile.upcomingEmi ? 'Due by 10th of Month' : 'No Current Dues'}
          </span>
        </div>
      </div>

      {/* Cash Flow Timeline Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Cumulative Inflow vs Outflow Trend
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Visualizing liquidity stability and burn rate across periods
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">{range} Period</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a237e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1a237e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6f00" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ff6f00" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, '']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Inflow"
                stroke="#1a237e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#inflowGrad)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Outflow"
                stroke="#ff6f00"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#outflowGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions List & Upcoming Obligations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Verified Transactions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Categorized ledger with audit validation
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
              {['all', 'credit', 'debit'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                    activeFilter === f
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {tx.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {tx.category} &bull; {tx.date}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-mono font-bold ${
                      tx.type === 'credit'
                        ? 'text-green-600 dark:text-green-400'
                        : tx.type === 'failed'
                        ? 'text-red-500'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      tx.status === 'Completed'
                        ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payments & Calendar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Upcoming Obligations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Scheduled debits & calendar reminders
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  <span>Mandatory Auto-Debit</span>
                  <span className="font-mono text-red-600 dark:text-red-400">
                    {activeProfile.upcomingEmi ? `₹${activeProfile.upcomingEmi.toLocaleString('en-IN')}` : 'None'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeProfile.upcomingEmi ? 'Scheduled for 10th of this month' : 'Zero outstanding EMI scheduled'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  <span>Electricity & Utilities</span>
                  <span className="font-mono">₹1,250</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Due in 8 days &bull; BBPS Auto-Pay Active
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  <span>Monthly Savings Target</span>
                  <span className="font-mono text-green-600 dark:text-green-400">
                    ₹{monthlySavings.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Allocated to liquid emergency buffer
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            Cash flows monitored under responsible banking compliance.
          </div>
        </div>
      </div>
    </div>
  )
}
