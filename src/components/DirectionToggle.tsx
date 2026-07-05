import { Direction } from '../algorithms/diskScheduling'

interface Props {
  value: Direction
  onChange: (d: Direction) => void
}

export default function DirectionToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-neutral-600 dark:text-neutral-400">Direction</span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('up')}
          className={`px-3 py-1.5 rounded-md border text-sm ${
            value === 'up'
              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
              : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Up (toward higher tracks)
        </button>
        <button
          onClick={() => onChange('down')}
          className={`px-3 py-1.5 rounded-md border text-sm ${
            value === 'down'
              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
              : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          Down (toward lower tracks)
        </button>
      </div>
    </div>
  )
}