export default function DietAssignedToPatients({ patients = [] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {patients.map((name, i) => (
        <div
          key={`${name}-${i}`}
          className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
        >
          <span className="text-gray-900">{name}</span>
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Activa</span>
        </div>
      ))}
    </div>
  );
}
