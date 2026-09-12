import React, { useState, useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useDemoStore } from '../store/useDemoStore'
import { getRecommendationsData } from '../services/mockAdapters'

export const Route = createFileRoute('/_auth/recommendations')({
  component: RecommendationsPage,
})

function RecommendationsPage() {
  const navigate = useNavigate()
  const { activeProfile, canApplyForLoan } = useDemoStore()
  const [recommendations, setRecommendations] = useState([])
  const [dismissedIds, setDismissedIds] = useState([])
  const [expandedWhyId, setExpandedWhyId] = useState(null)
  const [actionSuccessMessage, setActionSuccessMessage] = useState('')

  useEffect(() => {
    const data = getRecommendationsData(activeProfile.id)
    setRecommendations(data.slice(0, 3))
    setDismissedIds([])
    setExpandedWhyId(null)
    setActionSuccessMessage('')
  }, [activeProfile.id])

  const handleDismiss = (id) => {
    setDismissedIds((prev) => [...prev, id])
  }

  const handleAction = (rec) => {
    if (rec.actionType === 'apply' && rec.id.includes('kcc')) {
      navigate({ to: '/loans' })
    } else if (rec.actionType === 'support') {
      setActionSuccessMessage(`Your request for "${rec.title}" has been registered. A relationship counselor will reach out within 2 hours.`)
    } else if (!canApplyForLoan() && rec.title.toLowerCase().includes('credit')) {
      setActionSuccessMessage('Borrowing products are currently locked by ethical guardrails. Please explore debt relief options.')
    } else {
      setActionSuccessMessage(`Exploration initiated for "${rec.title}". Details have been queued to your registered mobile and regional vernacular voice portal.`)
    }
  }

  const visibleRecs = recommendations.filter((r) => !dismissedIds.includes(r.id))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              AI Recommendations
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
              Max 3 / Session
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explainable & ethical financial recommendations for {activeProfile.name} ({activeProfile.displaySegment})
          </p>
        </div>
      </div>

      {/* Fairness & Ethics Guarantee Notice */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-bold mb-0.5">Algorithmic Fairness Verification</div>
          <div className="text-indigo-800 dark:text-indigo-300">
            Passed fairness checks. Caste, gender, religion, and sensitive traits are strictly excluded from recommendation weights. Modeled entirely on cash flows, liquidity buffers, and stated goals.
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 shrink-0">
          Responsible AI Certified
        </span>
      </div>

      {actionSuccessMessage && (
        <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-xs font-semibold">
          {actionSuccessMessage}
        </div>
      )}

      {visibleRecs.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No active recommendations for this session
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            You have dismissed or actioned all recommendations. Switch profiles in the header to preview other customer recommendations.
          </p>
          <button
            onClick={() => setDismissedIds([])}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-900 text-white"
          >
            Reset Dismissed Items
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleRecs.map((rec, index) => {
            const isExpanded = expandedWhyId === rec.id

            return (
              <div
                key={rec.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{index + 1}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {rec.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {rec.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
                      {rec.matchScore}% Match
                    </span>
                    <button
                      onClick={() => handleDismiss(rec.id)}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold px-2 py-1"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                {/* Benefit & Explanation */}
                <div className="mt-4 space-y-2 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Primary Benefit: </span>
                    <span className="text-slate-600 dark:text-slate-400">{rec.benefit}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {rec.explanation}
                  </p>
                </div>

                {/* "Why this?" Factor Breakdown */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-in fade-in">
                    <div>
                      <span className="font-bold uppercase tracking-wider text-[10px] text-green-700 dark:text-green-400 block mb-2">
                        Positive Contributing Factors
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        {rec.positiveFactors.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="font-bold text-green-600">+</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 block mb-2">
                        Considerations & Risk Notes
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        {rec.negativeFactors.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="font-bold text-amber-600">&bull;</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedWhyId(isExpanded ? null : rec.id)}
                    className="text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:underline"
                  >
                    {isExpanded ? 'Hide Factor Breakdown' : 'Why this recommendation?'}
                  </button>

                  <button
                    onClick={() => handleAction(rec)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white transition shadow-sm"
                  >
                    {rec.actionLabel}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
