export default function QuestionCard({ label, children, isReadOnly }) {
  return (
    <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
      <label className="mb-3 block text-sm font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}
