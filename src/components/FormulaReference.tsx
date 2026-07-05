const FORMULAS = [
  { label: 'Turnaround Time (TAT)', formula: 'Completion Time - Arrival Time' },
  { label: 'Waiting Time (WT)', formula: 'Turnaround Time - Burst Time' },
  { label: 'Response Time (RT)', formula: 'First Response Time - Arrival Time' },
]

export default function FormulaReference() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3">
      <div className="text-neutral-500 text-xs uppercase tracking-wide mb-2">Formulas</div>
      <ul className="space-y-1.5">
        {FORMULAS.map((f) => (
          <li key={f.label} className="text-sm flex flex-wrap gap-x-2">
            <span className="text-amber-600 dark:text-amber-400 font-medium">{f.label}</span>
            <span className="text-neutral-500">=</span>
            <span className="text-neutral-700 dark:text-neutral-300">{f.formula}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}