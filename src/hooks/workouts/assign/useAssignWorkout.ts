import { useState } from 'react';

export function useAssignWorkout() {
  const [patientToAssign, setPatientToAssign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editPatients = async (workoutId, patients) => {
    setIsLoading(true);
    setError(null);

    try {
      const patientsPayload = patients.map((id) => ({ patient: id }));

      const res = await fetch(`/api/workouts/${workoutId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ patients: patientsPayload }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit patients');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { patientToAssign, setPatientToAssign, isLoading, error, editPatients };
}

// Usage Example:
// const { patientToAssign, setPatientToAssign, isLoading, error, editPatients } = useAssignWorkout();

// Asignar pacientes a un workout (pasar array de strings)
// await editPatients(workoutId, [patientId1, patientId2]);
