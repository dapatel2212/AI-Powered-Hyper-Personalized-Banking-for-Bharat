import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SparklesIcon, XMarkIcon, PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/solid';
import useAppStore from '../../store/useAppStore';

export default function ChatWindow() {
  const { t, i18n } = useTranslation();
  const { isChatOpen, toggleChat, unreadMessages, clearUnread } = useAppStore();
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am BankBuddy, your personal financial assistant. How can I help you today?', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      clearUnread();
      scrollToBottom();
    }
  }, [isChatOpen, messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    
    const newUserMsg = { id: Date.now(), sender: 'user', text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        text: 'I can help you explore suitable options. Before I recommend anything, I\'ll check your eligibility and financial safety preferences.',
        timestamp: new Date().toISOString()
      }]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      handleSend(transcript);
    };

    recognition.start();
  };

  const quickReplies = ['Check eligibility', 'Compare loans', 'Learn about EMI', 'Talk to advisor'];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleChat}
          className="relative bg-gradient-to-r from-primary to-indigo-900 text-white p-4 rounded-full shadow-float hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          {isChatOpen ? <XMarkIcon className="w-6 h-6" /> : <SparklesIcon className="w-6 h-6" />}
          {!isChatOpen && unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {unreadMessages}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-full max-w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden"
          >
            {/* Premium Header */}
            <div className="bg-white p-5 border-b border-gray-100 shadow-sm relative z-10 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-primary text-xl">✦</span>
                  <div className="font-bold text-gray-900 text-lg tracking-tight">BankBuddy AI</div>
                </div>
                <select 
                  className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg px-2 py-1 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500 font-medium">Your personal financial assistant</p>
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-bg/50 flex flex-col gap-4">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'}`}>
                    {msg.sender === 'bot' && <div className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">BankBuddy AI</div>}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-2">Thinking</span>
                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  </div>
                </div>
              )}
              
              {isListening && (
                <div className="flex justify-center my-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-full px-4 py-2 flex items-center gap-3">
                    <div className="flex gap-1 items-end h-4">
                      <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-primary rounded-full" />
                      <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-primary rounded-full" />
                      <motion.div animate={{ height: [12, 6, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-primary rounded-full" />
                      <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-primary rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-primary">Listening...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-5 py-3 bg-white flex flex-wrap gap-2 border-t border-gray-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] z-10">
              {quickReplies.map(reply => (
                <button 
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
              <button 
                onClick={handleVoiceInput}
                className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-primary/10 text-primary shadow-inner scale-95' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                <MicrophoneIcon className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask BankBuddy..."
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal"
                />
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`p-3 rounded-xl transition-all shadow-sm ${input.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
