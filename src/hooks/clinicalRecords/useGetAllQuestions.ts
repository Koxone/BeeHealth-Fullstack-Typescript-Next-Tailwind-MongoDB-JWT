import { useState, useEffect } from 'react';

export interface Question {
  _id: string;
  questionId: number;
  text: string;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full';
  isMetric: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export function useGetAllQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const res = await fetch('/api/clinicalRecords/questions');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch questions');
        }

        setQuestions(data.data.sort((a, b) => a.questionId - b.questionId));
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  return { questions, loading, error };
}
