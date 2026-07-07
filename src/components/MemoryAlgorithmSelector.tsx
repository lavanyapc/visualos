import { MemoryAlgorithm } from '../algorithms/memoryAllocation'

const OPTIONS: { value: MemoryAlgorithm; label: string }[] = [
  { value: 'FIRST_FIT', label: 'First Fit' },
  { value: 'BEST_FIT', label: 'Best Fit' },
  { value: 'WORST_FIT', label: 'Worst Fit' },
  { value: 'NEXT_FIT', label: 'Next Fit' },
]

interface Props {
  value: MemoryAlgorithm
  onChange: (a: MemoryAlgorithm) => void
}

export default function MemoryAlgorithmSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
            value === opt.value
              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
              : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}