interface Props {
  requests: number[]
  onChange: (requests: number[]) => void
  startPosition: number
  onStartPositionChange: (value: number) => void
  diskSize: number
  onDiskSizeChange: (value: number) => void
}

export default function DiskRequestInput({
  requests,
  onChange,
  startPosition,
  onStartPositionChange,
  diskSize,
  onDiskSizeChange,
}: Props) {
  const updateRequest = (index: number, value: number) => {
    const next = [...requests]
    next[index] = value
    onChange(next)
  }

  const addRequest = () => {
    onChange([...requests, 0])
  }

  const removeRequest = (index: number) => {
    onChange(requests.filter((_, i) => i !== index))
  }

  const inputClass =
    'bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap text-sm">
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Head start</span>
          <input
            type="number"
            min={0}
            max={diskSize - 1}
            value={startPosition}
            onChange={(e) => onStartPositionChange(Number(e.target.value))}
            className={`${inputClass} w-20`}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Disk size</span>
          <input
            type="number"
            min={1}
            value={diskSize}
            onChange={(e) => onDiskSizeChange(Number(e.target.value))}
            className={`${inputClass} w-20`}
          />
        </label>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
        <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">
          Requests (track numbers)
        </div>
        <div className="flex flex-wrap gap-2">
          {requests.map((r, i) => (
            <div key={i} className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={diskSize - 1}
                value={r}
                onChange={(e) => updateRequest(i, Number(e.target.value))}
                className={`${inputClass} w-16`}
              />
              <button
                onClick={() => removeRequest(i)}
                className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-xs"
                aria-label={`Remove request ${r}`}
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addRequest}
            className="px-2 py-1 text-sm text-amber-600 dark:text-amber-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded"
          >
            + add
          </button>
        </div>
      </div>
    </div>
  )
}