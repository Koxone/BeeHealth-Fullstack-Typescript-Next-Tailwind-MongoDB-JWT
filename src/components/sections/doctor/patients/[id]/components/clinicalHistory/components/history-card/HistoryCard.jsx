import { Scale, Edit2, Eye, Pencil, Trash2 } from 'lucide-react';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import Link from 'next/link';
import EditRecordDateButton from './components/EditRecordDateButton';
import { useEditClinicalRecord } from '@/hooks/clinicalRecords/edit/useEditClinicalRecord';

function HistoryCard({ r, onEdit, specialty, showDeleteModal, setShowDeleteModal, onDelete }) {
  function getValueByQuestionId(questionId) {
    if (!r?.answers) return null;

    // Handle both object and array formats
    let answersArray = [];
    if (Array.isArray(r.answers)) {
      answersArray = r.answers;
    } else if (typeof r.answers === 'object') {
      answersArray = Object.values(r.answers);
    }

    const ans = answersArray.find((a) => a?.question?.questionId === questionId);
    return ans ? ans.value : null;
  }
  const { questions } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'quick' && q.specialty === specialty);

  const { editClinicalRecord } = useEditClinicalRecord();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {/* Date block */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark border-beehealth-blue-primary-solid flex h-12 w-12 flex-col items-center justify-center rounded-lg border sm:h-14 sm:w-14">
          <span className="text-xs font-medium uppercase">
            {new Date(r.recordDate).toLocaleDateString('es-MX', { month: 'short' })}
          </span>
          <span className="text-base font-bold sm:text-lg">{r.recordDate.substring(8, 10)}</span>
        </div>

        {/* First record badge */}
        {r?.version === 'full' && (
          <span className="text-beehealth-blue-primary-solid text-xs font-semibold">
            Primera Vez
          </span>
        )}

        {/* Edit record date */}
        {r?.version === 'short' && (
          <EditRecordDateButton
            onSelect={(formattedDate) => {
              editClinicalRecord(r._id, { recordDate: formattedDate });
            }}
          />
        )}

        {/* Edit record date */}
        {r?.version === 'full' && (
          <EditRecordDateButton
            onSelect={(formattedDate) => {
              editClinicalRecord(r._id, { recordDate: formattedDate });
            }}
          />
        )}
      </div>

      {/* Info cards */}
      <div className="grid w-full grid-cols-4 grid-rows-2 items-center justify-center gap-2">
        {filtered?.map((element) => {
          const value = getValueByQuestionId(element.questionId);

          const bgClass =
            element.questionId === 18 || element.questionId === 26
              ? 'bg-beehealth-red-primary-light'
              : 'bg-beehealth-green-secondary-light';

          return (
            <div key={element._id} className={`${bgClass} h-full rounded-lg p-2`}>
              <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                <span className="truncate">{element.text}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{value}</p>
            </div>
          );
        })}

        {/* Diet on this record */}
        <Link
          href={r?.diets?.[0]?._id ? `/doctor/diets/${r.diets[0]._id}` : '#'}
          className="bg-beehealth-blue-primary-solid border-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105"
        >
          <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
            <span className="truncate text-white underline">Dieta Asignada</span>
          </div>

          <p className="text-sm font-medium text-gray-900">{r?.diets?.[0]?.name || 'Ninguna'}</p>
        </Link>

        {/* Workout on this record */}
        <Link
          href={r?.workouts?.[0]?._id ? `/doctor/workouts/` : '#'}
          className="bg-beehealth-blue-primary-solid border-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover h-full cursor-pointer rounded-lg border p-2 transition-all hover:scale-105"
        >
          <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
            <span className="truncate text-white underline">Entrenamiento Asignado</span>
          </div>

          <p className="text-sm font-medium text-gray-900">{r?.workouts?.[0]?.name || 'Ninguna'}</p>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(r, true)}
          className="hover:bg-beehealth-green-secondary-dark-hover bg-beehealth-green-secondary-dark self-start rounded-lg p-2 text-white hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div className="flex flex-col justify-between">
          {/* Edit Record Button */}
          <button
            onClick={() => onEdit(r, false)}
            className="hover:bg-beehealth-yellow-secondary-solid-hover bg-beehealth-yellow-secondary-solid self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
          >
            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Delete Record Button */}
          <button
            onClick={() => onDelete(r)}
            className="hover:bg-beehealth-red-primary-solid-hover bg-beehealth-red-primary-solid self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
