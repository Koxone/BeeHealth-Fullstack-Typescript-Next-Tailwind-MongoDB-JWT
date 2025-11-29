import { Scale, Edit2, Eye } from 'lucide-react';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';

function HistoryCard({ r, onEdit, specialty }) {
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

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
      {/* Date block */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark border-beehealth-blue-primary-solid flex h-12 w-12 flex-col items-center justify-center rounded-lg border sm:h-14 sm:w-14">
          <span className="text-xs font-medium uppercase">
            {new Date(r.updatedAt).toLocaleDateString('es-MX', { month: 'short' })}
          </span>
          <span className="text-base font-bold sm:text-lg">
            {new Date(r.updatedAt).toLocaleDateString('es-MX', { day: '2-digit' })}
          </span>
        </div>

        {r?.version === 'full' && (
          <span className="text-beehealth-blue-primary-solid text-xs font-semibold">
            Primera Vez
          </span>
        )}
      </div>

      {/* Info cards */}
      <div className="grid w-full grid-cols-4 grid-rows-2 items-center justify-center gap-2">
        {filtered?.map((element) => {
          const value = getValueByQuestionId(element.questionId);

          return (
            <div
              key={element._id}
              className="bg-beehealth-green-secondary-light h-full rounded-lg p-2"
            >
              <div className="text-beehealth-green-primary-solid flex items-center gap-1.5 text-xs font-medium sm:gap-2">
                <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="truncate">{element.text}</span>
              </div>
              <p className="text-sm font-bold text-(--med-text-dark)">{value}</p>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(r, true)}
          className="hover:bg-beehealth-green-secondary-dark-hover bg-beehealth-green-secondary-dark self-start rounded-lg p-2 text-white hover:text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <button
          onClick={() => onEdit(r, false)}
          className="hover:bg-beehealth-green-secondary-dark-hover bg-beehealth-green-secondary-dark self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
