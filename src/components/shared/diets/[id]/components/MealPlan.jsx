function MealBlock({ title, time, items }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-600">{time}</span>
      </div>
      <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function MealPlan({ blocks }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, idx) => (
        <MealBlock key={idx} title={b.titulo} time={b.hora} items={b.items} />
      ))}
    </div>
  );
}
