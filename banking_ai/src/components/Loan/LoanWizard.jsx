import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

export default function LoanWizard() {
  const { t } = useTranslation();
  const { loanProgress, setLoanProgress, loanData, updateLoanData } = useAppStore();

  const handleNext = () => setLoanProgress(Math.min(7, loanProgress + 1));
  const handleBack = () => setLoanProgress(Math.max(1, loanProgress - 1));

  const steps = [
    'Product Selection',
    'Amount Selector',
    'Tenure + EMI',
    'Personal Details',
    'Income Proof',
    'KYC',
    'Confirmation'
  ];

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-float border border-gray-100 p-8 min-h-[500px] flex flex-col relative overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {loanProgress} of 7</span>
          <span className="text-sm font-medium text-gray-500">{steps[loanProgress - 1]}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            className="bg-primary h-full rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${(loanProgress / 7) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={loanProgress}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Step 1: Product Selection */}
            {loanProgress === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">What kind of loan do you need?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Kisan Credit'].map(prod => (
                    <button 
                      key={prod}
                      onClick={() => updateLoanData({ product: prod })}
                      className={`p-4 rounded-2xl text-left transition-all ${
                        loanData.product === prod 
                          ? 'border-2 border-primary bg-primary/5 text-primary font-bold shadow-sm' 
                          : 'border-2 border-transparent bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium'
                      }`}
                    >
                      {prod}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Amount Selector */}
            {loanProgress === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">How much do you need?</h2>
                <div className="py-4">
                  <div className="text-center mb-8">
                    <span className="text-5xl font-bold text-primary tracking-tight">₹{(loanData.amount || 50000).toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" max="500000" step="10000"
                    value={loanData.amount || 50000}
                    onChange={(e) => updateLoanData({ amount: Number(e.target.value) })}
                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs font-semibold text-gray-400 mt-3 uppercase tracking-wider">
                    <span>₹10,000</span>
                    <span>₹5,00,000</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Tenure + EMI */}
            {loanProgress === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Choose your tenure</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[12, 24, 36, 48, 60].map(months => {
                    const amount = loanData.amount || 50000;
                    const rate = 0.12 / 12;
                    const emi = Math.round(amount * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1));
                    return (
                      <button 
                        key={months}
                        onClick={() => updateLoanData({ tenure: months, emi })}
                        className={`p-4 rounded-2xl text-left transition-all ${
                          loanData.tenure === months 
                            ? 'border-2 border-primary bg-primary/5 shadow-sm' 
                            : 'border-2 border-transparent bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`font-bold ${loanData.tenure === months ? 'text-primary' : 'text-gray-900'}`}>{months} Months</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">₹{emi.toLocaleString('en-IN')} / mo</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Personal Details */}
            {loanProgress === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Confirm your details</h2>
                <div className="space-y-4">
                  <input type="text" value={loanData.name || "Ramesh Kumar"} onChange={(e) => updateLoanData({name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium" placeholder="Full Name" />
                  <input type="text" value={loanData.dob || "1985-04-12"} onChange={(e) => updateLoanData({dob: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium" placeholder="DOB (YYYY-MM-DD)" />
                  <input type="text" value={loanData.pan || "ABCDE1234F"} onChange={(e) => updateLoanData({pan: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-uppercase" placeholder="PAN Number" />
                  <input type="text" value={loanData.aadhaar || "XXXX-XXXX-1234"} onChange={(e) => updateLoanData({aadhaar: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium tracking-widest" placeholder="Aadhaar Number" />
                </div>
              </div>
            )}

            {/* Step 5: Income Proof */}
            {loanProgress === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Verify your income</h2>
                <button className="w-full py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3">
                  <span className="text-3xl">📄</span>
                  <span className="font-medium">Upload Bank Statement or ITR</span>
                </button>
                <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">OR</div>
                <button className="w-full py-4 bg-white text-primary font-bold border-2 border-primary rounded-2xl hover:bg-primary/5 transition-colors shadow-sm">
                  Verify via Net Banking
                </button>
              </div>
            )}

            {/* Step 6: KYC */}
            {loanProgress === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Complete your KYC</h2>
                <div className="grid gap-4">
                  <button className="p-5 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200">
                    <div className="font-bold text-gray-900 mb-1">Aadhaar OTP</div>
                    <div className="text-sm font-medium text-gray-500">Fastest, requires linked mobile number</div>
                  </button>
                  <button className="p-5 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-gray-200">
                    <div className="font-bold text-gray-900 mb-1">Video KYC</div>
                    <div className="text-sm font-medium text-gray-500">Connect with an agent via video call</div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Confirmation */}
            {loanProgress === 7 && (
              <div className="text-center space-y-6 py-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto text-5xl"
                >
                  🎉
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Loan Approved!</h2>
                  <p className="text-gray-500 font-medium">
                    Your {loanData.product || 'loan'} of <span className="text-gray-900 font-bold">₹{(loanData.amount || 50000).toLocaleString('en-IN')}</span> has been approved. The amount will be credited to your account shortly.
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-left space-y-3 shadow-sm">
                  <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
                    <span className="text-gray-500 font-medium">EMI Amount</span>
                    <span className="font-bold text-gray-900 text-lg">₹{(loanData.emi || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-gray-500 font-medium">Tenure</span>
                    <span className="font-bold text-gray-900">{loanData.tenure || 0} Months</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-4 mt-8 pt-6">
        <button 
          onClick={handleBack}
          disabled={loanProgress === 1}
          className={`flex-1 py-3 rounded-xl font-bold transition-colors ${loanProgress === 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
        >
          Back
        </button>
        {loanProgress < 7 ? (
          <button 
            onClick={handleNext}
            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Continue
          </button>
        ) : (
          <button 
            onClick={() => setLoanProgress(1)}
            className="flex-1 py-3 bg-success text-white rounded-xl font-bold hover:bg-success/90 transition-colors shadow-sm"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
