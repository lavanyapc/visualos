interface Props {
  processSize: number
  onProcessSizeChange: (value: number) => void
  pageSize: number
  onPageSizeChange: (value: number) => void
  memorySize: number
  onMemorySizeChange: (value: number) => void
}

export default function PagingSetupInput({
  processSize,
  onProcessSizeChange,
  pageSize,
  onPageSizeChange,
  memorySize,
  onMemorySizeChange,
}: Props) {
  const inputClass =
    'w-28 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  return (
    <div className="flex items-center gap-4 flex-wrap text-sm">
      <label className="flex items-center gap-2">
        <span className="text-neutral-600 dark:text-neutral-400">Process size</span>
        <input
          type="number"
          min={1}
          value={processSize}
          onChange={(e) => onProcessSizeChange(Number(e.target.value))}
          className={inputClass}
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="text-neutral-600 dark:text-neutral-400">Page size</span>
        <input
          type="number"
          min={1}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={inputClass}
        />
      </label>
      <label className="flex items-center gap-2">
        <span className="text-neutral-600 dark:text-neutral-400">Memory size</span>
        <input
          type="number"
          min={1}
          value={memorySize}
          onChange={(e) => onMemorySizeChange(Number(e.target.value))}
          className={inputClass}
        />
      </label>
    </div>
  )
}