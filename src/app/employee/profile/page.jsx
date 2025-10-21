"use client";

import { User, Mail, Phone, Calendar, Briefcase } from "lucide-react";

export default function EmployeeProfile() {
  const empleado = {
    nombre: "Laura Martínez",
    email: "laura.martinez@medtrack.com",
    telefono: "555-0200",
    puesto: "Recepcionista",
    fechaIngreso: "2023-01-15",
    horario: "Lunes a Viernes, 8:00 AM - 5:00 PM"
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-sm md:text-base text-gray-600">Información personal y laboral</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
            {empleado.nombre.split(" ").map(n => n[0]).join("")}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{empleado.nombre}</h2>
          <p className="text-gray-600">{empleado.puesto}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{empleado.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Teléfono</p>
              <p className="font-medium text-gray-900">{empleado.telefono}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Fecha de Ingreso</p>
              <p className="font-medium text-gray-900">{empleado.fechaIngreso}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Horario</p>
              <p className="font-medium text-gray-900">{empleado.horario}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}