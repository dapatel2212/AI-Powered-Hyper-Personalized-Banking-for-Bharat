import React, { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDemoStore } from '../store/useDemoStore'

export const Route = createFileRoute('/_auth/consent')({
  component: ConsentPage,
})

const CONSENT_ITEMS = [
  {
    key: 'transaction_analysis',
    title: 'Transaction Pattern Analysis',
    what: 'Raw UPI, NEFT, and debit transaction histories across savings accounts.',
    why: 'Enables our algorithms to categorize cash flows, seasonal crop spend, and compute liquidity surplus.',
    how: 'AES-256 encrypted at rest inside AWS Mumbai (ap-south-1). Never shared with external advertisers.',
    essential: false,
  },
  {
    key: 'health_monitoring',
    title: 'Financial Health & Stress Monitoring',
    what: 'EMI payment consistency, account balance volatility, and bounce alerts.',
    why: 'Triggers responsible lending protections to lock predatory high-interest borrowing when stress rises.',
    how: 'Processed via client-side privacy preserved embeddings without third-party exposure.',
    essential: false,
  },
  {
    key: 'ai_chat',
    title: 'BankBuddy Vernacular AI Memory',
    what: 'Chat transcripts and conversation context in regional languages (Hindi, Tamil, Marathi, etc.).',
    why: 'Allows the assistant to remember your financial context across distinct chat sessions.',
    how: 'Sanitized with automatic PII masking for PAN, Aadhaar, and account numbers.',
    essential: false,
  },
  {
    key: 'life_events',
    title: 'Predictive Life Event Detection',
    what: 'Inferred signals of child schooling, crop harvesting, or business expansion.',
    why: 'Offers timely insurance or savings support before major capital expenditures occur.',
    how: 'Consent-gated inferencing; purged automatically after 30 days.',
    essential: false,
  },
  {
    key: 'marketing',
    title: 'Partner Offers & Promotional Notifications',
    what: 'Contact preferences for subsidized tractor, fertilizer, or merchant POS discounts.',
    why: 'Informs you about government subventions and retail banking partner discounts.',
    how: 'Strictly opt-in under DPDP Act 2023. Zero pre-checked boxes.',
    essential: false,
  },
]

function ConsentPage() {
  const { activeProfile } = useDemoStore()

  // STRICT RULE: Every consent must default to OFF (false).
  const [consents, setConsents] = useState({
    transaction_analysis: false,
    health_monitoring: false,
    ai_chat: false,
    life_events: false,
    marketing: false,
  })

  const [historyLog, setHistoryLog] = useState([
    {
      action: 'Initial Account Setup',
      timestamp: '12 Sep 2026, 10:00 AM',
      note: 'All optional DPDP consents initialized to OFF (Zero opt-in baseline).',
    },
  ])

  const [statusMessage, setStatusMessage] = useState('')

  const handleToggle = (key, title) => {
    const nextState = !consents[key]
    setConsents((prev) => ({ ...prev, [key]: nextState }))

    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const entry = {
      action: `${title} ${nextState ? 'Granted' : 'Revoked'}`,
      timestamp: `Today, ${now}`,
      note: `Recorded under RBI Master Directions on Digital Consent Token #CON-${Date.now().toString(36).toUpperCase()}`,
    }
    setHistoryLog((prev) => [entry, ...prev])
    setStatusMessage(`Consent preference for "${title}" updated to ${nextState ? 'ACTIVE' : 'REVOKED'}.`)
  }

  // Calculate dynamic privacy score based on opt-in discretion
  const activeCount = Object.values(consents).filter(Boolean).length
  const privacyScore = 100 - activeCount * 12

  const handleDownloadData = () => {
    const exportData = {
      customer_id: activeProfile.id,
      name: activeProfile.name,
      segment: activeProfile.segment,
      language: activeProfile.language,
      consents: consents,
      exported_at: new Date().toISOString(),
      compliance: 'Digital Personal Data Protection (DPDP) Act 2023 Compliance Export',
    }

    const dataBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `BankBuddy_Data_${activeProfile.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setStatusMessage('Encrypted customer data export generated and downloaded.')
  }

  const handleDeleteData = () => {
    setStatusMessage('Irreversible Right to Erasure request registered under DPDP Act 2023. Account records queued for purge per RBI retention guidelines.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Consent & Privacy Center
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
            DPDP 2023 & RBI Compliant
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Granular permission governance for {activeProfile.name} &bull; All permissions default to OFF
        </p>
      </div>

      {/* Privacy Score & Regulatory Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Data Minimization Index
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {privacyScore} / 100
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {activeCount === 0
              ? 'Maximum privacy. No optional personal data is processed.'
              : `${activeCount} optional processing scopes actively authorized.`}
          </p>
        </div>

        <div className="text-right">
          <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
            Zero Pre-Checked Boxes Enforced
          </span>
          <div className="text-[10px] text-slate-400 mt-1">
            Data residency localized strictly in Mumbai (ap-south-1)
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 text-xs font-semibold">
          {statusMessage}
        </div>
      )}

      {/* Consent Toggles List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {CONSENT_ITEMS.map((item, index) => {
          const isEnabled = consents[item.key]

          return (
            <div key={item.key} className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      0{index + 1}
                    </span>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h2>
                  </div>
                </div>

                {/* Accessible Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.key, item.title)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEnabled ? 'bg-indigo-900 dark:bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* What, Why, How breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">What Data:</span>
                  {item.what}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Why Used:</span>
                  {item.why}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">How Protected:</span>
                  {item.how}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Data Subject Rights (DPDP Rights) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Data Subject Statutory Rights
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Download your encrypted banking data or exercise your statutory Right to Erasure
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadData}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Download Data (JSON)
          </button>
          <button
            onClick={handleDeleteData}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
          >
            Right to Erasure
          </button>
        </div>
      </div>

      {/* Consent Audit History Log */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Immutable Consent Audit Log
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {historyLog.map((log, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">
                  {log.action}
                </span>
                <span className="text-slate-500 text-[11px]">{log.note}</span>
              </div>
              <span className="font-mono text-slate-400 text-[11px] shrink-0 ml-4">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
