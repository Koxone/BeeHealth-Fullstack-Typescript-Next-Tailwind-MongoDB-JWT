import { useMutation } from '@tanstack/react-query';

interface TimelineCreateRequest {
  eventType: string;
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: Record<string, any>;
  startDate?: Date;
  dietId?: string;
}

interface TimelineEvent {
  _id: string;
  patient: {
    _id: string;
    fullName: string;
    email: string;
  };
  doctor: {
    _id: string;
    fullName: string;
    email: string;
  };
  eventType: string;
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: Record<string, any>;
  compliance: {
    status: string;
    rating?: number;
    doctorNotes?: string;
    reviewedAt?: Date;
    reviewedBy?: string;
  };
  isActive: boolean;
  startDate: Date;
  completedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function useCreateTimelineEvent() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ patientId, ...data }: TimelineCreateRequest & { patientId: string }) => {
      const res = await fetch(`/api/patients/${patientId}/timeline/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Failed to create timeline event');
      }

      const json = await res.json();
      return json.event as TimelineEvent;
    },
  });

  return {
    createTimelineEvent: mutateAsync,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}

// Usage Example:
// const { createTimelineEvent, isLoading, error } = useCreateTimelineEvent();
// await createTimelineEvent({
//   patientId: '123',
//   eventType: 'diet_assigned',
//   dietId: '456',
//   snapshot: { dietName: 'Dieta Vegana' }
// });
