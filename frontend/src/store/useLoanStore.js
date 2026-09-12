import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLoanStore = create(
  persist(
    (set) => ({
      step: 1, // 1: product, 2: amount, 3: tenure, 4: details, 5: income, 6: kyc, 7: confirmation
      loanDetails: {
        product: '',
        amount: 5000,
        tenureMonths: 12,
        personalDetailsCompleted: false,
        incomeProofUploaded: false,
        kycCompleted: false,
      },
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 7) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
      updateLoanDetails: (updates) => set((state) => ({ 
        loanDetails: { ...state.loanDetails, ...updates } 
      })),
      resetLoan: () => set({ step: 1, loanDetails: { amount: 5000, tenureMonths: 12 } }),
    }),
    { name: 'loan-storage' }
  )
)
