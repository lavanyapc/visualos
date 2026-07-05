import { Algorithm } from '../algorithms/cpuScheduling'

const OPTIONS: { value: Algorithm; label: string }[] = [
  { value: 'FCFS', label: 'FCFS' },
  { value: 'SJF', label: 'SJF' },
  { value: 'SRTF', label: 'SRTF' },
  { value: 'PRIORITY', label: 'Priority' },
  { value: 'RR', label: 'Round Robin' },
]

interface Props {
  value: Algorithm
  onChange: (a: Algorithm) => void
}

export default function AlgorithmSelector({ value, onChange }: Props) {
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