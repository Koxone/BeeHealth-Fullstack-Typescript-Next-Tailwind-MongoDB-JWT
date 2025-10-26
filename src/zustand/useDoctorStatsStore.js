'use client';

import { create } from 'zustand';

/* store */
export const useDoctorStatsStore = create((set) => ({
  // initial state
  totalAppointmentsThisMonth: 0,
  daysWithAppointments: 0,
  todayAppointments: 0,
  visiblePatientsCount: 0, 

  // setters
  setTotalAppointmentsThisMonth: (value) => set({ totalAppointmentsThisMonth: value }),
  setDaysWithAppointments: (value) => set({ daysWithAppointments: value }),
  setTodayAppointments: (value) => set({ todayAppointments: value }),
  setVisiblePatientsCount: (value) => set({ visiblePatientsCount: value }),

  // bulk update
  setAllStats: (stats) =>
    set({
      totalAppointmentsThisMonth: stats.totalAppointmentsThisMonth,
      daysWithAppointments: stats.daysWithAppointments,
      todayAppointments: stats.todayAppointments,
    }),
}));
