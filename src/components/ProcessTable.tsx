import { Process } from '../types'

interface Props {
  processes: Process[]
  onChange: (processes: Process[]) => void
  showPriority: boolean
}

export default function ProcessTable({ processes, onChange, showPriority }: Props) {
  const updateField = (id: string, field: keyof Process, value: number) => {
    onChange(processes.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addProcess = () => {
    const nextNumber = processes.length + 1
    onChange([
      ...processes,
      { id: `P${nextNumber}`, arrivalTime: 0, burstTime: 4, priority: nextNumber },
    ])
  }

  const removeProcess = (id: string) => {
    onChange(processes.filter((p) => p.id !== id))
  }

  const inputClass =
    'w-16 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1'

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden w-full max-w-2xl">
      <table className="w-full text-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
          <tr>
            <th className="text-left px-3 py-2">Process</th>
            <th className="text-left px-3 py-2">Arrival</th>
            <th className="text-left px-3 py-2">Burst</th>
            {showPriority && <th className="text-left px-3 py-2">Priority</th>}
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p) => (
            <tr key={p.id} className="border-t border-neutral-200 dark:border-neutral-800">
              <td className="px-3 py-2">{p.id}</td>
              <td className="px-3 py-2">
                <input
                  type="number"
                  value={p.arrivalTime}
                  onChange={(e) => updateField(p.id, 'arrivalTime', Number(e.target.value))}
                  className={inputClass}
                />
              </td>
              <td className="px-3 py-2">
                <input
                  type="number"
                  value={p.burstTime}
                  onChange={(e) => updateField(p.id, 'burstTime', Number(e.target.value))}
                  className={inputClass}
                />
              </td>
              {showPriority && (
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={p.priority}
                    onChange={(e) => updateField(p.id, 'priority', Number(e.target.value))}
                    className={inputClass}
                  />
                </td>
              )}
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => removeProcess(p.id)}
                  className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addProcess}
        className="w-full text-left px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
        + add process
      </button>
    </div>
  )
}