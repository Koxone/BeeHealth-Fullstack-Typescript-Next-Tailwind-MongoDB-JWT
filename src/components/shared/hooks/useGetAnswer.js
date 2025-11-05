'use client';

import { useMemo } from 'react';
import questions from '@/data/questions.json';

/* Hook to get formatted answers */
export default function useGetAnswer(record) {
  // Create a memoized lookup map from the JSON
  const questionMap = useMemo(() => {
    const map = {};
    for (const q of questions) map[q.id] = q;
    return map;
  }, []);

  // Return the function that gets the answer
  const getAnswer = (id) => {
    if (!record || !record.answers) return 'Sin registro';
    const rawAnswer = record.answers[id];
    if (rawAnswer == null || rawAnswer === '') return 'Sin respuesta';

    // Try to match the question definition
    const question = questionMap[id];
    if (!question) return rawAnswer;

    // If question has options (select/radio), match label
    if (question.options && Array.isArray(question.options)) {
      const match = question.options.find(
        (opt) => (typeof opt === 'object' ? opt.value : opt) === rawAnswer
      );
      if (match) {
        return typeof match === 'object' ? match.label : match;
      }
    }

    // Return text/number/date/etc.
    return rawAnswer;
  };

  return getAnswer;
}
