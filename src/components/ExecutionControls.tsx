interface Props {
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrev: () => void
  onReset: () => void
  disableNext: boolean
  disablePrev: boolean
}

export default function ExecutionControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onReset,
  disableNext,
  disablePrev,
}: Props) {
  const buttonClass =
    'px-3 py-1.5 rounded-md text-sm border bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={onPrev} disabled={disablePrev} className={buttonClass} aria-label="Previous step">
        Previous
      </button>

      <button
        onClick={onPlayPause}
        className="px-4 py-1.5 rounded-md text-sm bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 transition-colors"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button onClick={onNext} disabled={disableNext} className={buttonClass} aria-label="Next step">
        Next
      </button>

      <button onClick={onReset} className={buttonClass}>
        Reset
      </button>
    </div>
  )
}