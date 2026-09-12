import { create } from 'zustand';

const widgetOrder = {
  prudent_savers: ['savings', 'investments', 'recommendations'],
  aspiring_spenders: ['recommendations', 'spending', 'savings'],
  family_builders: ['insurance', 'emi', 'recommendations'],
  seasonal_earners: ['loan_status', 'weather', 'recommendations'],
  stressed: ['stress_alert', 'restructure', 'spending'],
};

const mockCustomer = {
  name: "Ramesh Kumar",
  segment: "seasonal_earners",
  balance: 42500,
  language: "hi",
  stressLevel: "GREEN"
};

const useAppStore = create((set) => ({
  customer: mockCustomer,
  segment: mockCustomer.segment,
  widgets: widgetOrder[mockCustomer.segment],
  setSegment: (newSegment) => set({ 
    segment: newSegment, 
    widgets: widgetOrder[newSegment] || widgetOrder.seasonal_earners 
  }),
  
  // Chatbot State
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  unreadMessages: 1,
  clearUnread: () => set({ unreadMessages: 0 }),
  
  // Loan Wizard State
  loanProgress: 1,
  setLoanProgress: (step) => set({ loanProgress: step }),
  loanData: {},
  updateLoanData: (data) => set((state) => ({ loanData: { ...state.loanData, ...data } })),
}));

export default useAppStore;
