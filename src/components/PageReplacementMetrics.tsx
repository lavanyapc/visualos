import { PageReplacementResult } from '../algorithms/pageReplacement'

interface Props {
  result: PageReplacementResult
}

export default function PageReplacementMetrics({ result }: Props) {
  const total = result.totalFaults + result.totalHits
  const faultRate = total === 0 ? 0 : (result.totalFaults / total) * 100

  return (
    <div className="flex gap-3 flex-wrap">
      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1 min-w-[120px]">
        <div className="text-neutral-500 text-xs uppercase tracking-wide">Page Faults</div>
        <div className="text-2xl font-semibold text-red-500 dark:text-red-400 mt-1">{result.totalFaults}</div>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1 min-w-[120px]">
        <div className="text-neutral-500 text-xs uppercase tracking-wide">Hits</div>
        <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">{result.totalHits}</div>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1 min-w-[120px]">
        <div className="text-neutral-500 text-xs uppercase tracking-wide">Fault Rate</div>
        <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">{faultRate.toFixed(1)}%</div>
      </div>
    </div>
  )
}