import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* Auth store with localStorage persistence */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,

      // Actions
      setUser: (userData) => set({ user: userData, isAuthenticated: !!userData }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),

      // Restore from backend if cookie exists
      loadUser: async () => {
        try {
          const res = await fetch('/api/auth/me', { credentials: 'include' });
          if (!res.ok) throw new Error('No session');
          const data = await res.json();
          set({
            user: data.user,
            isAuthenticated: true,
          });
        } catch (err) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage', // Key name in localStorage
      storage: createJSONStorage(() => localStorage), // Ensures no SSR crash
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
