export default function InputField({
  label = '',
  type = 'text',
  placeholder = '',
  required,
  value,
  onChange,
}) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 md:py-3"
      />
    </div>
  );
}
