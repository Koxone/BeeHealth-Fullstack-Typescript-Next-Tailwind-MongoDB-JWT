import { useState } from 'react';

export function useEditDiet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editDiet = async (dietId, fields) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/diets/${dietId}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit diet');
      }

      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, editDiet };
}
