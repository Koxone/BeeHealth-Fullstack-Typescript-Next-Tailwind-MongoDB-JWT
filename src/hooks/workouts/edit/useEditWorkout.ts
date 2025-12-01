import { useState } from 'react';

export interface WorkoutPayload {
  patients?: string[];
  name?: string;
  type?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: number;
  about?: string;
  instructions?: string[];
  benefits?: string[];
  cautions?: string[];
  images?: string[];
  video?: string;
}

export function useEditWorkout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editWorkout = async (workoutId: string, payload: WorkoutPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/workouts/${workoutId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
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
