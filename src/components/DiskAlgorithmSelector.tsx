import { DiskAlgorithm } from '../algorithms/diskScheduling'

const OPTIONS: { value: DiskAlgorithm; label: string }[] = [
  { value: 'FCFS', label: 'FCFS' },
  { value: 'SSTF', label: 'SSTF' },
  { value: 'SCAN', label: 'SCAN' },
  { value: 'LOOK', label: 'LOOK' },
  { value: 'CSCAN', label: 'C-SCAN' },
]

interface Props {
  value: DiskAlgorithm
  onChange: (a: DiskAlgorithm) => void
}

export default function DiskAlgorithmSelector({ value, onChange }: Props) {
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