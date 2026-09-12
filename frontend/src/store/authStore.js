import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  customer: JSON.parse(localStorage.getItem('customer') || 'null'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,

  login: async (identifier, password) => {
    set({ loading: true, error: null });
    try {
      const { customer } = await authService.login(identifier, password);
      set({ customer, isAuthenticated: true, loading: false });
      return customer;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }
  },

  logout: () => {
    authService.logout();
    set({ customer: null, isAuthenticated: false });
  },

  setCustomer: (customer) => {
    localStorage.setItem('customer', JSON.stringify(customer));
    set({ customer });
  }
}));
