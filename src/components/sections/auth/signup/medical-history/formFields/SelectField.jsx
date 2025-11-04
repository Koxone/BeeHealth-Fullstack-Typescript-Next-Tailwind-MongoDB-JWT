// SelectField.jsx
export default function SelectField({ label, options, required, color = 'blue', value, onChange }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value || ''}
        onChange={onChange}
        required={required}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-${color}-500 md:py-3`}
      >
        <option value="">Seleccione</option>
        {options?.map((opt) => {
          // Support both string and object formats
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}
