import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      token: null,

      // login user
      login: (user, token) => set({ currentUser: user, token }),

      // logout user
      logout: () => set({ currentUser: null, token: null }),
    }),
    {
      name: 'auth-storage', // nombre de la key en localStorage
    }
  )
);
