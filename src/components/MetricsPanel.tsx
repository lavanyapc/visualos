import { SchedulingResult } from '../algorithms/cpuScheduling'

interface Props {
  result: SchedulingResult
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1">
      <div className="text-neutral-500 dark:text-neutral-500 text-xs uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">{value.toFixed(2)}</div>
    </div>
  )
}

export default function MetricsPanel({ result }: Props) {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-3">
        <StatCard label="Avg Waiting Time" value={result.avgWaitingTime} />
        <StatCard label="Avg Turnaround Time" value={result.avgTurnaroundTime} />
        <StatCard label="Avg Response Time" value={result.avgResponseTime} />
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
            <tr>
              <th className="text-left px-3 py-2">Process</th>
              <th className="text-left px-3 py-2" title="When the process finished executing">
                Completion
              </th>
              <th className="text-left px-3 py-2" title="Completion Time - Arrival Time">
                Turnaround
              </th>
              <th className="text-left px-3 py-2" title="Turnaround Time - Burst Time">
                Waiting
              </th>
              <th className="text-left px-3 py-2" title="First Response Time - Arrival Time">
                Response
              </th>
            </tr>
          </thead>
          <tbody>
            {result.metrics.map((m) => (
              <tr key={m.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-3 py-2">{m.id}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{m.completionTime}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{m.turnaroundTime}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{m.waitingTime}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{m.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}