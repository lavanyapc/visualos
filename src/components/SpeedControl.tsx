const SPEEDS = [0.5, 1, 2, 5]

interface Props {
  value: number
  onChange: (speed: number) => void
}

export default function SpeedControl({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm flex-wrap">
      <span className="text-neutral-600 dark:text-neutral-400">Speed</span>
      {SPEEDS.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-2.5 py-1 rounded-md border text-xs ${
            value === s
              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
              : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          {s}x
        </button>
      ))}
    </div>
  )
}