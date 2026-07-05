interface Props {
  value: number
  onChange: (q: number) => void
}

export default function QuantumSlider({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-neutral-600 dark:text-neutral-400">Quantum</span>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-40 accent-amber-400"
      />
      <span className="text-amber-600 dark:text-amber-400 font-semibold w-6">{value}</span>
    </div>
  )
}