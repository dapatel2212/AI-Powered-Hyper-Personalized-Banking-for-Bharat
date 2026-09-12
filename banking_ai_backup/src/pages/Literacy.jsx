import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/Common/DashboardLayout';
import { PlayIcon, CheckCircleIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Literacy() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  const lessons = [
    { id: 1, title: 'What is SIP?', duration: '60 sec', level: 'Beginner', xp: 50, icon: '📈' },
    { id: 2, title: 'Why Health Insurance?', duration: '90 sec', level: 'Beginner', xp: 50, icon: '🏥' },
    { id: 3, title: 'How EMI Works', duration: '2 min', level: 'Intermediate', xp: 100, icon: '📊' },
    { id: 4, title: 'What is CIBIL Score?', duration: '3 min', level: 'Intermediate', xp: 100, icon: '🎯' },
    { id: 5, title: '50-30-20 Budget Rule', duration: '2 min', level: 'Advanced', xp: 150, icon: '💰' },
  ];

  const handleStartLesson = (lesson) => {
    setActiveLesson(lesson);
    setQuizScore(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Knowledge</h1>
        <p className="text-gray-500">Master your finances, one step at a time.</p>
      </div>

      {!activeLesson ? (
        <>
          {/* Level System Card */}
          <div className="bg-gradient-to-r from-primary to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-float mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <SparklesIcon className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm font-bold text-xl">
                    4
                  </div>
                  <h2 className="text-2xl font-bold">Level 4</h2>
                </div>
                <p className="text-primary-100 font-medium">+120 XP this week</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>78% to Level 5</span>
                  <span>1,450 / 1,800 XP</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 backdrop-blur-sm">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-secondary h-full rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full w-full h-full animate-pulse-slow"></div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map(lesson => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={lesson.id} 
                className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100 flex flex-col transition-all cursor-pointer group"
                onClick={() => handleStartLesson(lesson)}
              >
                <div className="h-40 bg-gray-50 rounded-2xl mb-5 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                  {lesson.icon}
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-md">{lesson.level}</span>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md flex items-center gap-1">
                    +{lesson.xp} XP
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{lesson.title}</h3>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-xs font-medium text-gray-500">{lesson.duration} read</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-gray-400">
                    <PlayIcon className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-float border border-gray-100 overflow-hidden max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary to-indigo-800 p-8 text-white relative">
              <button 
                onClick={() => setActiveLesson(null)}
                className="absolute top-6 right-6 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-md uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
                {activeLesson.level}
              </span>
              <h2 className="text-3xl font-bold">{activeLesson.title}</h2>
            </div>
            
            <div className="p-8 space-y-8">
              {quizScore === null ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="prose prose-base max-w-none text-gray-700 leading-relaxed mb-8">
                    <p>A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in a mutual fund scheme.</p>
                    <p>Instead of investing a large lump sum, you can start with as little as ₹500 per month. This helps in building discipline and averages out market volatility (Rupee Cost Averaging).</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-secondary" />
                      Knowledge Check
                    </h4>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-800 mb-4">What is the main benefit of SIP?</p>
                      <button onClick={() => setQuizScore(0)} className="w-full p-4 text-left bg-white border border-gray-200 rounded-2xl hover:border-primary hover:shadow-sm font-medium text-gray-700 transition-all">A) Guaranteed 20% returns</button>
                      <button onClick={() => setQuizScore(100)} className="w-full p-4 text-left bg-white border border-gray-200 rounded-2xl hover:border-primary hover:shadow-sm font-medium text-gray-700 transition-all">B) Rupee Cost Averaging & Discipline</button>
                      <button onClick={() => setQuizScore(0)} className="w-full p-4 text-left bg-white border border-gray-200 rounded-2xl hover:border-primary hover:shadow-sm font-medium text-gray-700 transition-all">C) No tax on profits</button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="text-center py-12"
                >
                  {quizScore === 100 ? (
                    <>
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                        className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircleIcon className="w-16 h-16 text-success" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">Excellent Work!</h3>
                      <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-8">
                        <SparklesIcon className="w-5 h-5 text-secondary" />
                        <span className="font-bold text-secondary">+{activeLesson.xp} XP Earned</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-6">😅</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Not quite right</h3>
                      <p className="text-gray-500 mb-8 font-medium">Review the lesson and try again to earn XP.</p>
                    </>
                  )}
                  <button 
                    onClick={() => setActiveLesson(null)}
                    className="px-8 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Back to Lessons
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </DashboardLayout>
  );
}
