import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function WhatsAppSimulator() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Namaste! I am BankBuddy. How can I help you today?\n\n1. Check Balance\n2. Apply for Loan\n3. View Recent Transactions\n\nReply with a number or type your query.', time: '10:30 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input, time: '10:31 AM' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        text: 'Fetching details from our AI engine...',
        time: '10:31 AM'
      }]);
    }, 1000);
  };

  return (
    <div className="w-[320px] h-[550px] bg-[#ece5dd] border-8 border-gray-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative mx-auto my-8">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>
      
      {/* WA Header */}
      <div className="bg-[#075e54] text-white p-4 pt-8 flex items-center gap-3 z-10 shadow-md">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">🤖</div>
        <div>
          <div className="font-bold">BankBuddy AI</div>
          <div className="text-xs text-white/80">Active now</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <motion.initial animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }}>
              <div className={`max-w-[85%] rounded-xl p-2 px-3 shadow-sm relative ${msg.sender === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                <div className="text-[14px] text-gray-800 whitespace-pre-wrap leading-snug">{msg.text}</div>
                <div className="text-[10px] text-gray-400 text-right mt-1 flex justify-end items-center gap-1">
                  {msg.time}
                  {msg.sender === 'user' && <span className="text-blue-500">✓✓</span>}
                </div>
              </div>
            </motion.initial>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Message"
          className="flex-1 bg-white px-4 py-2 rounded-full text-sm outline-none"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#00a884] text-white rounded-full flex items-center justify-center shadow-sm"
        >
          <PaperAirplaneIcon className="w-5 h-5 -ml-0.5" />
        </button>
      </div>
    </div>
  );
}
