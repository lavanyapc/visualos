import { colorForProcess } from '../utils/processColors'

interface Props {
  queue: string[]
  running: string | null
  processIds: string[]
}

export default function ReadyQueueView({ queue, running, processIds }: Props) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-neutral-100 dark:bg-neutral-900 space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Running:</span>
        {running ? (
          <span
            className="px-2 py-0.5 rounded text-xs font-semibold text-neutral-950"
            style={{ backgroundColor: colorForProcess(running, processIds) }}
          >
            {running}
          </span>
        ) : (
          <span className="text-neutral-400 dark:text-neutral-600 text-xs">idle</span>
        )}
      </div>

      <div>
        <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">Ready Queue</div>
        {queue.length === 0 ? (
          <p className="text-neutral-400 dark:text-neutral-600 text-xs">empty</p>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            {queue.map((id, i) => (
              <div key={`${id}-${i}`} className="flex items-center gap-2">
                <span
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-neutral-950"
                  style={{ backgroundColor: colorForProcess(id, processIds) }}
                >
                  {id}
                </span>
                {i < queue.length - 1 && <span className="text-neutral-400 dark:text-neutral-600">→</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}