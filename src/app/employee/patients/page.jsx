"use client";

import { useState } from "react";
import { Search, User, Phone, Mail, Calendar } from "lucide-react";

export default function EmployeePatients() {
  const [searchTerm, setSearchTerm] = useState("");

  const pacientes = [
    { id: 1, nombre: "Juan Pérez", telefono: "555-0101", email: "juan@email.com", ultimaVisita: "2024-10-21" },
    { id: 2, nombre: "María López", telefono: "555-0102", email: "maria@email.com", ultimaVisita: "2024-10-20" },
    { id: 3, nombre: "Carlos Ruiz", telefono: "555-0103", email: "carlos@email.com", ultimaVisita: "2024-10-19" },
    { id: 4, nombre: "Ana Martínez", telefono: "555-0104", email: "ana@email.com", ultimaVisita: "2024-10-18" },
    { id: 5, nombre: "Pedro García", telefono: "555-0105", email: "pedro@email.com", ultimaVisita: "2024-10-17" },
  ];

  const filteredPacientes = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.telefono.includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Pacientes</h1>
        <p className="text-sm md:text-base text-gray-600">Buscar y ver información de pacientes</p>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {/* Lista de pacientes */}
      <div className="grid grid-cols-1 gap-3">
        {filteredPacientes.map((paciente) => (
          <div key={paciente.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {paciente.nombre.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{paciente.nombre}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{paciente.telefono}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{paciente.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Última: {paciente.ultimaVisita}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPacientes.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron pacientes</p>
          <p className="text-sm text-gray-500">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
}