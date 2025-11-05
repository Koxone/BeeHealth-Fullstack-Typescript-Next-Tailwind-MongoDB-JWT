// src/components/sections/doctor/patients/[id]/components/historyModal/components/QuestionnaireSection.jsx
'use client';

import { useMemo, useState } from 'react';
import QuestionCard from './QuestionCard';
import questions from '@/data/questions.json';
import { Search, ClipboardList } from 'lucide-react';
import useAuthStore from '@/zustand/useAuthStore';

export default function QuestionnaireSection({ isReadOnly = false, getAnswer, setAnswer }) {
  // Read specialty from store
  const { user } = useAuthStore();
  const specialty = user?.specialty || 'weight';

  // Local search only
  const [searchTerm, setSearchTerm] = useState('');

  // Fixed version
  const version = 'full';

  // Filter by specialty and version
  const filteredQuestions = useMemo(() => {
    return questions.filter(
      (q) => q.specialties.includes(specialty) && q.versions.includes(version)
    );
  }, [specialty]);

  // Search
  const searchedQuestions = useMemo(() => {
    if (!searchTerm.trim()) return filteredQuestions;
    const lower = searchTerm.toLowerCase();
    return filteredQuestions.filter((q) => q.question.toLowerCase().includes(lower));
  }, [filteredQuestions, searchTerm]);

  // Render input by type
  const renderField = (q) => {
    const { id, question, type, placeholder, options } = q;
    const value = getAnswer(id);

    switch (type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <input
            id={id}
            name={`q-${id}`}
            type={type}
            disabled={isReadOnly}
            value={value}
            onChange={(e) => setAnswer(id, e.target.value)}
            placeholder={placeholder || ''}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        );

      case 'textarea':
        return (
          <textarea
            id={id}
            name={`q-${id}`}
            disabled={isReadOnly}
            value={value}
            onChange={(e) => setAnswer(id, e.target.value)}
            placeholder={placeholder || ''}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            rows={3}
          />
        );

      case 'select':
        return (
          <select
            id={id}
            name={`q-${id}`}
            disabled={isReadOnly}
            value={value}
            onChange={(e) => setAnswer(id, e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Seleccione</option>
            {options?.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={String(val)} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        );

      case 'radio':
        return (
          <div id={id} className="flex flex-wrap gap-4">
            {options?.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <label
                  key={String(val)}
                  htmlFor={`q-${id}-${val}`}
                  className="flex items-center gap-2"
                >
                  <input
                    id={`q-${id}-${val}`}
                    name={`q-${id}`}
                    type="radio"
                    value={val}
                    checked={value === val}
                    onChange={() => setAnswer(id, val)}
                    disabled={isReadOnly}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{lbl}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <ClipboardList className="h-5 w-5 text-blue-600" />
        Cuestionario Médico Completo
      </h3>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* List */}
      {searchedQuestions.length > 0 ? (
        searchedQuestions.map((q) => (
          <QuestionCard key={`q-${q.id}`} label={`${q.question}`} isReadOnly={isReadOnly}>
            {renderField(q)}
          </QuestionCard>
        ))
      ) : (
        <p className="text-sm text-gray-500">No se encontraron preguntas.</p>
      )}
    </div>
  );
}
