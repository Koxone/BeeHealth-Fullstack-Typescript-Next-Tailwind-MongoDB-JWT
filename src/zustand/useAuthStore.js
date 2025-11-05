import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,

  // Actions
  setUser: (userData) => set({ user: userData }),
  setToken: (token) => set({ token }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
