'use client';

import { useState } from 'react';
import Header from './components/Header';
import ConsultaForm from './components/consultForm/ConsultaForm';
import Actions from './components/Actions';

/* Container */
export default function EmployeeCreateConsultModal({ onClose, onCreate }) {
  // Local state
  const [form, setForm] = useState({
    hora: '',
    paciente: '',
    tipo: '',
    costo: '',
    pagado: true,
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Header title="Agregar Consulta" onClose={onClose} />
          {/* Content */}
          <form onSubmit={handleSubmit} className="max-h-[calc(90vh-160px)] overflow-y-auto p-6">
            <ConsultaForm form={form} setForm={setForm} />
            <Actions onClose={onClose} submitLabel="Guardar" />
          </form>
        </div>
      </div>
    </>
  );
}
