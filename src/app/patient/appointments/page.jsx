"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Plus, X, RefreshCw, AlertCircle } from "lucide-react";

const appointmentsData = [
  { id: 1, fecha: "2024-10-25", hora: "10:00", medico: "Dr. García", especialidad: "Endocrinología", estado: "Confirmada" },
  { id: 2, fecha: "2024-11-05", hora: "15:30", medico: "Dra. Martínez", especialidad: "Nutrición", estado: "Pendiente" },
  { id: 3, fecha: "2024-09-20", hora: "11:00", medico: "Dr. García", especialidad: "Endocrinología", estado: "Completada" },
];

export default function PatientAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(appointmentsData);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Completada": return "bg-gray-100 text-gray-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelClick = (apt) => {
    setSelectedAppointment(apt);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, estado: "Cancelada" }
          : apt
      ));
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleReschedule = (apt) => {
    // Guardar datos de la cita para prellenar el formulario
    localStorage.setItem("rescheduleAppointment", JSON.stringify(apt));
    router.push("/patient/appointments/new");
  };

  const canModify = (estado) => {
    return estado === "Confirmada" || estado === "Pendiente";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Citas Médicas</h1>
          <p className="text-sm md:text-base text-gray-600">Gestiona tus consultas médicas</p>
        </div>
        <button
          onClick={() => router.push("/patient/appointments/new")}
          className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Agendar Cita</span>
          <span className="sm:hidden">Nueva</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium whitespace-nowrap active:scale-95">
          Todas
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 whitespace-nowrap active:scale-95">
          Próximas
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 whitespace-nowrap active:scale-95">
          Completadas
        </button>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 whitespace-nowrap active:scale-95">
          Canceladas
        </button>
      </div>

      {/* Lista de citas */}
      <div className="grid gap-4">
        {appointments.map((apt) => (
          <div 
            key={apt.id} 
            className={`bg-white rounded-xl shadow-sm border-2 p-4 md:p-6 transition ${
              apt.estado === "Cancelada" ? "border-red-200 opacity-60" : "border-gray-200 hover:shadow-md"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Información de la cita */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">{apt.fecha}</span>
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{apt.hora}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.estado)}`}>
                    {apt.estado}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 font-medium">{apt.medico}</span>
                  <span className="text-sm text-gray-500">• {apt.especialidad}</span>
                </div>
              </div>

              {/* Botones de acción */}
              {canModify(apt.estado) && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReschedule(apt)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-sm active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reagendar</span>
                  </button>
                  <button
                    onClick={() => handleCancelClick(apt)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm active:scale-95"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancelar</span>
                  </button>
                </div>
              )}

              {apt.estado === "Completada" && (
                <div className="text-sm text-gray-500 italic">
                  Consulta finalizada
                </div>
              )}

              {apt.estado === "Cancelada" && (
                <div className="text-sm text-red-600 italic font-medium">
                  Cita cancelada
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay citas */}
      {appointments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes citas programadas</h3>
          <p className="text-gray-600 mb-6">Agenda tu primera consulta con nuestros especialistas</p>
          <button
            onClick={() => router.push("/patient/appointments/new")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium active:scale-95"
          >
            Agendar Primera Cita
          </button>
        </div>
      )}

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && selectedAppointment && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  ¿Estás seguro de que deseas cancelar esta cita?
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{selectedAppointment.fecha}</span>
                      <Clock className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-gray-600">{selectedAppointment.hora}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{selectedAppointment.medico}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Si cancelas con menos de 24 horas de anticipación, podrías ser sujeto a cargos.
                  </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium active:scale-95"
                  >
                    No, mantener cita
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium active:scale-95"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

