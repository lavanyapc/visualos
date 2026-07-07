import { MemoryAllocationResult } from '../algorithms/memoryAllocation'

interface Props {
  result: MemoryAllocationResult
}

export default function MemoryResultsPanel({ result }: Props) {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-3">
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wide">Total Internal Fragmentation</div>
          <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">
            {result.totalInternalFragmentation}
          </div>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 flex-1">
          <div className="text-neutral-500 text-xs uppercase tracking-wide">Unallocated Processes</div>
          <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">
            {result.unallocatedCount}
          </div>
        </div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
            <tr>
              <th className="text-left px-3 py-2">Process</th>
              <th className="text-left px-3 py-2">Size</th>
              <th className="text-left px-3 py-2">Allocated Block</th>
              <th className="text-left px-3 py-2">Fragmentation</th>
            </tr>
          </thead>
          <tbody>
            {result.allocations.map((a) => (
              <tr key={a.processId} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-3 py-2">{a.processId}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{a.processSize}</td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                  {a.blockId ? `${a.blockId} (${a.blockSize})` : (
                    <span className="text-red-500 dark:text-red-400">not allocated</span>
                  )}
                </td>
                <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                  {a.blockId ? a.internalFragmentation : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}