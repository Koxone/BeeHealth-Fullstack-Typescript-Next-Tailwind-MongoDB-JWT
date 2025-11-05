export default function RadioGroupField({
  label,
  name,
  options = [],
  required = false,
  color = 'blue',
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={opt.value}
              required={required}
              className={`text-${color}-600 focus:ring-${color}-500`}
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
