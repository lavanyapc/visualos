import { MemoryBlock, MemoryAllocationResult } from '../algorithms/memoryAllocation'
import { colorForProcess } from '../utils/processColors'

interface Props {
  blocks: MemoryBlock[]
  result: MemoryAllocationResult
}

export default function MemoryChart({ blocks, result }: Props) {
  if (blocks.length === 0) {
    return <p className="text-neutral-500 text-sm">Add memory blocks to see the layout.</p>
  }

  const totalSize = blocks.reduce((sum, b) => sum + b.size, 0)
  const processIds = result.allocations.map((a) => a.processId)

  return (
    <div className="w-full space-y-3">
      <div className="flex w-full h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
        {blocks.map((block) => {
          const widthPercent = (block.size / totalSize) * 100
          const occupyingProcess = result.blockAssignments[block.id]

          return (
            <div
              key={block.id}
              style={{ width: `${widthPercent}%` }}
              className="relative h-full border-r border-neutral-200 dark:border-neutral-950/40 last:border-r-0 flex flex-col"
            >
              {occupyingProcess ? (
                <div
                  className="flex-1 flex items-center justify-center text-xs font-semibold text-neutral-950"
                  style={{ backgroundColor: colorForProcess(occupyingProcess, processIds) }}
                >
                  {occupyingProcess}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 dark:text-neutral-600 bg-neutral-100 dark:bg-neutral-900">
                  empty
                </div>
              )}
              <div className="text-[10px] text-center text-neutral-500 dark:text-neutral-500 py-0.5">
                {block.id} ({block.size})
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {processIds.map((id) => (
          <div key={id} className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ backgroundColor: colorForProcess(id, processIds) }}
            />
            {id}
          </div>
        ))}
      </div>
    </div>
  )
}