import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/Common/DashboardLayout';
import { ShieldCheckIcon, DocumentArrowDownIcon, TrashIcon, ClockIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Consent() {
  const [consents, setConsents] = useState({
    transaction: { status: true, date: 'Today, 09:41 AM' },
    location: { status: true, date: 'Yesterday, 14:20 PM' },
    sms: { status: true, date: '10 Sep 2026, 08:15 AM' },
    marketing: { status: false, date: '-' }
  });

  const [showRevokeConfirm, setShowRevokeConfirm] = useState(null);

  const handleRevoke = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: { status: false, date: 'Revoked just now' }
    }));
    setShowRevokeConfirm(null);
  };

  const handleGrant = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: { status: true, date: 'Granted just now' }
    }));
  };

  const dataTypes = [
    { 
      key: 'transaction', 
      label: 'Transaction History', 
      icon: '💳', 
      purpose: 'To calculate your Financial Health Score and provide personalized loan offers.',
      essential: true
    },
    { 
      key: 'location', 
      label: 'Location Data', 
      icon: '📍', 
      purpose: 'To detect suspicious transactions and find nearby ATMs.',
      essential: false
    },
    { 
      key: 'sms', 
      label: 'Financial SMS', 
      icon: '📱', 
      purpose: 'To aggregate your expenses automatically across all bank accounts.',
      essential: false
    },
    { 
      key: 'marketing', 
      label: 'Partner Offers', 
      icon: '🎁', 
      purpose: 'To receive targeted discounts from our partner brands.',
      essential: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy & Trust Center</h1>
        <p className="text-gray-500">You are in complete control of your data. We comply strictly with the DPDP Act.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-4">
            {dataTypes.map(item => (
              <motion.div 
                layout
                key={item.key} 
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  consents[item.key].status 
                    ? 'border-success/30 shadow-soft' 
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                    consents[item.key].status ? 'bg-success/10' : 'bg-gray-100 grayscale'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          {item.label}
                          {item.essential && (
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Essential</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{item.purpose}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 bg-gray-50 rounded-lg p-2 px-3 border border-gray-100 w-fit">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">Last accessed: {consents[item.key].date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-end border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-5 min-w-[120px]">
                    {consents[item.key].status ? (
                      <button 
                        onClick={() => setShowRevokeConfirm(item.key)}
                        className="w-full py-2.5 px-4 bg-white border border-danger/30 text-danger hover:bg-danger/5 font-semibold text-sm rounded-xl transition-colors"
                      >
                        Revoke Access
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleGrant(item.key)}
                        className="w-full py-2.5 px-4 bg-primary text-white hover:bg-primary/90 font-semibold text-sm rounded-xl transition-colors shadow-sm"
                      >
                        Grant Access
                      </button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {showRevokeConfirm === item.key && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-start gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-danger-900 mb-1">Are you sure?</p>
                          <p className="text-xs text-danger-800 mb-3">Revoking this access may impact your {item.label.toLowerCase()} experience.</p>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRevoke(item.key)}
                              className="px-4 py-2 bg-danger text-white text-xs font-bold rounded-lg shadow-sm hover:bg-danger-600 transition-colors"
                            >
                              Yes, Revoke
                            </button>
                            <button 
                              onClick={() => setShowRevokeConfirm(null)}
                              className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-indigo-900 rounded-3xl p-6 text-white shadow-float relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheckIcon className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-bold mb-2 relative z-10">Data Protection</h3>
            <p className="text-sm text-primary-100 mb-6 relative z-10 leading-relaxed">
              Your data is encrypted end-to-end and stored securely in India. We never sell your data to third parties.
            </p>
            <div className="space-y-3 relative z-10">
              <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-colors group backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  <span className="text-sm font-bold">Download My Data</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-md font-bold uppercase tracking-wider">JSON</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-danger/20 hover:bg-danger/30 border border-danger/30 rounded-2xl transition-colors group text-white backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <TrashIcon className="w-5 h-5" />
                  <span className="text-sm font-bold">Request Deletion</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <InformationCircleIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We comply strictly with the Digital Personal Data Protection (DPDP) Act, 2023. If you have any questions about how your data is used, please contact our Data Protection Officer.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
