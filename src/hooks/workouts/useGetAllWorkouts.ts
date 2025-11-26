import { useEffect, useState, useCallback } from 'react';
import { ZWorkout } from '@/zod/workouts/workout.schema';
import { workoutsResponseSchema } from '@/zod/workouts/api.workouts.schema';

export function useGetAllWorkouts() {
  const [workoutData, setWorkoutData] = useState<ZWorkout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/workouts');
      if (!res.ok) throw new Error('Failed to fetch workouts');

      const json = await res.json();
      const data = workoutsResponseSchema.parse(json);

      setWorkoutData(data.workouts);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return { workoutData, isLoading, error, refetch: fetchWorkouts };
}
