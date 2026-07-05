import { DiskSchedulingResult } from '../algorithms/diskScheduling'

interface Props {
  result: DiskSchedulingResult
}

export default function DiskMetricsPanel({ result }: Props) {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-3">
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wide">Total Seek Time</div>
          <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">
            {result.totalSeekTime}
          </div>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wide">Avg Seek Time</div>
          <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">
            {result.avgSeekTime.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
        <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">
          Service Order
        </div>
        <div className="flex flex-wrap items-center gap-1 text-sm font-mono">
          {result.seekSequence.map((track, i) => (
            <span key={i} className="flex items-center gap-1">
              <span
                className={
                  i === 0
                    ? 'text-violet-600 dark:text-violet-400 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300'
                }
              >
                {track}
              </span>
              {i < result.seekSequence.length - 1 && (
                <span className="text-neutral-400 dark:text-neutral-600">-&gt;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}