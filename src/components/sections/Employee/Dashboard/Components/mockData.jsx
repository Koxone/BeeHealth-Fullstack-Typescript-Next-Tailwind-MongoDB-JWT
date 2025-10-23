// basic data
export const citasHoyData = [
  { id: 1, hora: '09:00', paciente: 'Juan Pérez', estado: 'Confirmada', telefono: '555-0101' },
  { id: 2, hora: '10:30', paciente: 'María López', estado: 'Pendiente', telefono: '555-0102' },
  { id: 3, hora: '11:00', paciente: 'Carlos Ruiz', estado: 'Confirmada', telefono: '555-0103' },
  { id: 4, hora: '15:00', paciente: 'Ana Martínez', estado: 'Pendiente', telefono: '555-0104' },
  { id: 5, hora: '16:30', paciente: 'Pedro García', estado: 'Confirmada', telefono: '555-0105' },
];

// weekly chart
export const consultasSemanales = [
  { dia: 'Lun', consultas: 5 },
  { dia: 'Mar', consultas: 4 },
  { dia: 'Mié', consultas: 6 },
  { dia: 'Jue', consultas: 4 },
  { dia: 'Vie', consultas: 7 },
  { dia: 'Sáb', consultas: 3 },
  { dia: 'Hoy', consultas: 5 },
];

// inventory alerts
export const alertasInventarioPreset = [
  { nombre: 'Atorvastatina 20mg', stock: 12, minimo: 15 },
  { nombre: 'Omeprazol 20mg', stock: 8, minimo: 25 },
  { nombre: 'Alcohol 70%', stock: 8, minimo: 15 },
];
