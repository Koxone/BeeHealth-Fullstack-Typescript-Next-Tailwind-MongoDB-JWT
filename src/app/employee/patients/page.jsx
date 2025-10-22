'use client';

import { useState } from 'react';
import { Search, User, Phone, Mail, Calendar } from 'lucide-react';

export default function EmployeePatients() {
  const [searchTerm, setSearchTerm] = useState('');

  const pacientes = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      telefono: '555-0101',
      email: 'juan@email.com',
      ultimaVisita: '2024-10-21',
    },
    {
      id: 2,
      nombre: 'María López',
      telefono: '555-0102',
      email: 'maria@email.com',
      ultimaVisita: '2024-10-20',
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      telefono: '555-0103',
      email: 'carlos@email.com',
      ultimaVisita: '2024-10-19',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      telefono: '555-0104',
      email: 'ana@email.com',
      ultimaVisita: '2024-10-18',
    },
    {
      id: 5,
      nombre: 'Pedro García',
      telefono: '555-0105',
      email: 'pedro@email.com',
      ultimaVisita: '2024-10-17',
    },
  ];

  const filteredPacientes = pacientes.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.telefono.includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Pacientes</h1>
        <p className="text-sm text-gray-600 md:text-base">Buscar y ver información de pacientes</p>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lista de pacientes */}
      <div className="grid grid-cols-1 gap-3">
        {filteredPacientes.map((paciente) => (
          <div
            key={paciente.id}
            className="rounded-xl border-2 border-gray-200 bg-white p-4 transition hover:border-blue-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 font-semibold text-white">
                {paciente.nombre
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 font-semibold text-gray-900">{paciente.nombre}</h3>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-3">
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{paciente.telefono}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{paciente.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Última: {paciente.ultimaVisita}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPacientes.length === 0 && (
        <div className="py-12 text-center">
          <User className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-gray-600">No se encontraron pacientes</p>
          <p className="text-sm text-gray-500">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
}
