import React, { useState, useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDemoStore } from '../store/useDemoStore'

export const Route = createFileRoute('/_auth/whatsapp')({
  component: WhatsappPage,
})

function WhatsappPage() {
  const { activeProfile, canApplyForLoan } = useDemoStore()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    setMessages([
      {
        id: 'wa-1',
        sender: 'bot',
        time: '10:00 AM',
        text: `Namaste ${activeProfile.name.split(' ')[0]} ji! Welcome to BankBuddy on WhatsApp.\n\nYou can ask about your account balance, loan limits, or government scheme updates.`,
      },
    ])
  }, [activeProfile.id])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = (textToSend) => {
    const text = textToSend || input
    if (!text.trim()) return

    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      time: now,
      text: text.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const lower = text.toLowerCase()
      let botResponse = ''

      if (['loan', 'karz', 'credit', 'कर्ज', 'लोन'].some((w) => lower.includes(w))) {
        if (!canApplyForLoan()) {
          botResponse = `BankBuddy Ethical Guardrail:\n\nYour financial stress score is ${activeProfile.stressScore}/100. We cannot recommend new debt right now to protect your family from repayment strain.\n\nReply:\n1. Restructure EMI\n2. Shift EMI Date\n3. Talk to Free Counselor`
        } else {
          botResponse = `Good news! Based on your cash flows, you are pre-approved for up to ₹${activeProfile.monthlyIncome * 3} credit limit.\n\nReply:\n1. Calculate EMI\n2. Apply for Kisan / Personal Loan\n3. Talk to Agent`
        }
      } else if (lower.includes('balance') || lower.includes('paisa')) {
        botResponse = `BankBuddy Balance Update:\n\nAccount: Savings (...4920)\nAvailable: ₹${activeProfile.balance.toLocaleString('en-IN')}\nStatus: Active & Verified`
      } else {
        botResponse = `Thank you for reaching BankBuddy. You can check balance, verify pre-approved loans, or request vernacular voice support.`
      }

      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        time: now,
        text: botResponse,
      }
      setMessages((prev) => [...prev, botMsg])
    }, 600)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Simulation Notice Banner */}
      <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center text-xs font-semibold text-amber-900 dark:text-amber-200">
        Demo simulation &bull; Not connected to live Meta / WhatsApp servers &bull; Vernacular Conversational Adapter
      </div>

      {/* WhatsApp Styled Typography Container */}
      <div className="h-[calc(100vh-12rem)] flex flex-col bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* WhatsApp Chat Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-700 font-extrabold flex items-center justify-center font-mono text-sm">
              BB
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">BankBuddy Official Bharat Assistant</div>
              <div className="text-[10px] text-emerald-200">Verified WhatsApp Business Profile &bull; 24x7</div>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-900 px-2 py-0.5 rounded text-emerald-200">
            SIMULATION
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-emerald-50/20 dark:bg-slate-950">
          {messages.map((m) => {
            const isUser = m.sender === 'user'

            return (
              <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                  <div
                    className={`text-[9px] text-right mt-1 font-mono ${
                      isUser ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            )
          })}

          {isTyping && (
            <div className="text-[11px] text-slate-500 font-bold p-2 bg-white dark:bg-slate-900 rounded-xl w-24 text-center">
              Typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message (e.g. 'Check balance', 'Need loan')..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-40 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
