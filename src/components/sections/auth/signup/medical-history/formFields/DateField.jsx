export default function DateField({ label, required = false, color = 'blue', onChange, value }) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        onChange={onChange}
        value={value}
        required={required}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-${color}-500 md:py-3`}
      />
    </div>
  );
}
