import { MemoryBlock } from '../algorithms/memoryAllocation'

interface Props {
  blocks: MemoryBlock[]
  onChange: (blocks: MemoryBlock[]) => void
}

const nextBlockId = (blocks: MemoryBlock[]) => {
  let n = 1
  const existing = new Set(blocks.map((b) => b.id))
  while (existing.has(`B${n}`)) n++
  return `B${n}`
}

export default function MemoryBlockInput({ blocks, onChange }: Props) {
  const updateSize = (id: string, size: number) => {
    onChange(blocks.map((b) => (b.id === id ? { ...b, size } : b)))
  }

  const addBlock = () => {
    onChange([...blocks, { id: nextBlockId(blocks), size: 100 }])
  }

  const removeBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id))
  }

  const inputClass =
    'w-20 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
      <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">
        Memory Blocks (in order)
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {blocks.map((b) => (
          <div key={b.id} className="flex items-center gap-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{b.id}</span>
            <input
              type="number"
              min={1}
              value={b.size}
              onChange={(e) => updateSize(b.id, Number(e.target.value))}
              className={inputClass}
            />
            <button
              onClick={() => removeBlock(b.id)}
              className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-xs"
              aria-label={`Remove block ${b.id}`}
            >
              x
            </button>
          </div>
        ))}
        <button
          onClick={addBlock}
          className="px-2 py-1 text-sm text-amber-600 dark:text-amber-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded"
        >
          + add block
        </button>
      </div>
    </div>
  )
}