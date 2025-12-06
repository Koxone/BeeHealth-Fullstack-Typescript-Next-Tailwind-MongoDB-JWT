import { CurrentUserData } from '../user/user.types';

export interface ParsedDescription {
  paciente?: string;
  motivo?: string;
  telefono?: string;
  email?: string;
  fecha?: string;
  hora?: string;
  especialidad?: string;
  patientId?: string;
}

export interface CalendarEvent {
  id: string;
  description?: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
  attendees?: { email?: string }[];
}

export interface NormalizedAppointment {
  id: string;
  specialty: CurrentUserData['specialty'];
  tipo: string;
  hora: string;
  paciente: string;
  telefono: string;
  email: string;
  motivo: string;
  startISO: string | null;
  _dateKey: string;
  patientId: string;
}
