'use client';

import { useRouter } from 'next/navigation';
import { Search, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DoctorPatients() {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch pacientes reales
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/users', { method: 'GET' });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error al obtener pacientes');

        const onlyPatients = data.users.filter((u) => u.role === 'patient');
        setPatients(onlyPatients);
        setFiltered(onlyPatients);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();
  }, []);

  // buscar por nombre o correo
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFiltered(
      patients.filter(
        (p) => p.fullName.toLowerCase().includes(term) || p.email.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, patients]);

  console.log(patients)

  const getProgresoColor = (progreso) => {
    switch (progreso) {
      case 'Excelente':
        return 'bg-green-100 text-green-800';
      case 'Bueno':
        return 'bg-blue-100 text-blue-800';
      case 'Regular':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Mis Pacientes</h1>
          <p className="text-gray-600">Gestiona tu lista de pacientes</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Correo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teléfono</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((patient) => (
                <tr key={patient._id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {patient.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{patient.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => router.push(`/doctor/patients/${patient._id}`)}
                      className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center text-sm text-gray-500">
                  No se encontraron pacientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
