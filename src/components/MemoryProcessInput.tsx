import { ProcessRequest } from '../algorithms/memoryAllocation'

interface Props {
  processes: ProcessRequest[]
  onChange: (processes: ProcessRequest[]) => void
}

const nextProcessId = (processes: ProcessRequest[]) => {
  let n = 1
  const existing = new Set(processes.map((p) => p.id))
  while (existing.has(`P${n}`)) n++
  return `P${n}`
}

export default function MemoryProcessInput({ processes, onChange }: Props) {
  const updateSize = (id: string, size: number) => {
    onChange(processes.map((p) => (p.id === id ? { ...p, size } : p)))
  }

  const addProcess = () => {
    onChange([...processes, { id: nextProcessId(processes), size: 100 }])
  }

  const removeProcess = (id: string) => {
    onChange(processes.filter((p) => p.id !== id))
  }

  const inputClass =
    'w-20 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
      <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">
        Process Requests (in arrival order)
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {processes.map((p) => (
          <div key={p.id} className="flex items-center gap-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{p.id}</span>
            <input
              type="number"
              min={1}
              value={p.size}
              onChange={(e) => updateSize(p.id, Number(e.target.value))}
              className={inputClass}
            />
            <button
              onClick={() => removeProcess(p.id)}
              className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-xs"
              aria-label={`Remove process ${p.id}`}
            >
              x
            </button>
          </div>
        ))}
        <button
          onClick={addProcess}
          className="px-2 py-1 text-sm text-amber-600 dark:text-amber-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded"
        >
          + add process
        </button>
      </div>
    </div>
  )
}