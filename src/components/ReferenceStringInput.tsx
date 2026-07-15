interface Props {
  referenceString: number[]
  onChange: (value: number[]) => void
  numFrames: number
  onNumFramesChange: (value: number) => void
}

export default function ReferenceStringInput({
  referenceString,
  onChange,
  numFrames,
  onNumFramesChange,
}: Props) {
  const updatePage = (index: number, value: number) => {
    const next = [...referenceString]
    next[index] = value
    onChange(next)
  }

  const addPage = () => {
    onChange([...referenceString, 0])
  }

  const removePage = (index: number) => {
    onChange(referenceString.filter((_, i) => i !== index))
  }

  const inputClass =
    'w-14 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm text-center'

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">Number of frames</span>
        <input
          type="number"
          min={1}
          value={numFrames}
          onChange={(e) => onNumFramesChange(Number(e.target.value))}
          className={`${inputClass} w-16`}
        />
      </label>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
        <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">
          Reference String (in order)
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {referenceString.map((page, i) => (
            <div key={i} className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                value={page}
                onChange={(e) => updatePage(i, Number(e.target.value))}
                className={inputClass}
              />
              <button
                onClick={() => removePage(i)}
                className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-xs"
                aria-label={`Remove reference ${i}`}
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addPage}
            className="px-2 py-1 text-sm text-amber-600 dark:text-amber-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded"
          >
            + add
          </button>
        </div>
      </div>
    </div>
  )
}