'use client';

import ErrorState from '@/components/shared/feedback/ErrorState';
import LoadingState from '@/components/shared/feedback/LoadingState';
import { Clock, History, CheckCircle, XCircle } from 'lucide-react';
import { TimelineEventType } from '@/models/records/PatientTimeline';

const dietHistory = [
  {
    _id: '1',
    dietName: 'Bee Reset +',
    action: 'assigned',
    date: '2025-12-09T16:31:53.907Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '2',
    dietName: 'Dieta Mediterránea',
    action: 'completed',
    date: '2025-12-01T10:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '3',
    dietName: 'Dieta Mediterránea',
    action: 'assigned',
    date: '2025-11-15T10:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '4',
    dietName: 'Dieta Keto Básica',
    action: 'cancelled',
    date: '2025-10-20T14:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
  {
    _id: '5',
    dietName: 'Dieta Keto Básica',
    action: 'assigned',
    date: '2025-10-01T08:00:00.000Z',
    doctor: 'Dr. Arturo Lemus',
  },
];

export default function DietsHistory({
  patientId,
  events,
  timelineLoading,
  timelineError,
}: {
  patientId: string;
  events: any;
  timelineLoading: boolean;
  timelineError: any;
}) {
  const getActionBadge = (action: TimelineEventType) => {
    switch (action) {
      case 'diet_assigned':
        return {
          label: 'Asignada',
          className: 'bg-blue-100 text-blue-700',
          icon: CheckCircle,
        };
      case 'diet_completed':
        return {
          label: 'Completada',
          className: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };
      case 'diet_removed':
        return {
          label: 'Cancelada',
          className: 'bg-red-100 text-red-700',
          icon: XCircle,
        };
      default:
        return {
          label: action,
          className: 'bg-gray-100 text-gray-700',
          icon: Clock,
        };
    }
  };

  // Loading State
  if (timelineLoading) {
    return <LoadingState />;
  }

  // Error State
  if (timelineError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Diet History */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <History className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Historial de Dietas</h3>
            <p className="text-sm text-gray-500">Registro de asignaciones y cambios</p>
          </div>
        </div>

        <div className="space-y-3">
          {events?.map((record: any) => {
            const badge = getActionBadge(record?.eventType);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={record?._id}
                className="bg-beehealth-green-primary-light hover:bg-beehealth-green-primary-light-hover flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Date */}
                  <div className="border-beehealth-blue-primary-light bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg border text-center">
                    <span className="text-beehealth-blue-primary-dark text-xs font-medium uppercase">
                      {new Date(record?.completedDate || record?.startDate).toLocaleDateString(
                        'es-MX',
                        {
                          month: 'short',
                        }
                      )}
                    </span>
                    <span className="text-beehealth-blue-primary-dark text-lg font-bold">
                      {new Date(record?.completedDate || record?.startDate).getDate()}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {record?.snapshot?.dietName ||
                        record?.diet?.name ||
                        'Nombre de dieta no disponible'}
                    </p>
                    <p className="text-sm text-gray-500">Por: {record?.doctor?.fullName}</p>
                  </div>
                </div>

                {/* Action badge */}
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${badge.className}`}
                >
                  <BadgeIcon className="h-4 w-4" />
                  {badge.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
