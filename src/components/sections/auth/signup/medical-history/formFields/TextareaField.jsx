// TextareaField.jsx
export default function TextareaField({
  label,
  placeholder,
  rows = 2,
  onChange,
  required = false,
  color = 'blue',
  value,
}) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        rows={rows}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-${color}-500 md:py-3`}
      ></textarea>
    </div>
  );
}
