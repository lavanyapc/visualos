export type ModuleId = 'cpu' | 'disk' | 'memory' | 'paging' | 'pageReplacement' | 'deadlocks'

interface ModuleInfo {
  id: ModuleId
  label: string
  available: boolean
}

const MODULES: ModuleInfo[] = [
  { id: 'cpu', label: 'CPU Scheduling', available: true },
  { id: 'disk', label: 'Disk Scheduling', available: true },
  { id: 'memory', label: 'Memory Allocation', available: true },
  { id: 'paging', label: 'Paging', available: false },
  { id: 'pageReplacement', label: 'Page Replacement', available: false },
  { id: 'deadlocks', label: 'Deadlocks', available: false },
]

interface Props {
  onSelect: (module: ModuleId) => void
}

export default function ModuleSelect({ onSelect }: Props) {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-2xl font-bold tracking-tight">Choose a Module</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">
          Pick an Operating Systems topic to explore.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => m.available && onSelect(m.id)}
            disabled={!m.available}
            className={`rounded-lg border px-5 py-6 text-left transition-colors ${
              m.available
                ? 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:border-amber-400 dark:hover:border-amber-400 cursor-pointer'
                : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="font-semibold">{m.label}</div>
            {!m.available && (
              <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Coming soon</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}