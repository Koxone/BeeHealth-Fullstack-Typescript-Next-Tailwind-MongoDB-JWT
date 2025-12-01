import { useState } from 'react';

export function useEditWorkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editWorkout = async (workoutId, fields) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/workouts/${workoutId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit workout');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, editWorkout };
}
