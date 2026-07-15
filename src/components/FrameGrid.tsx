import { colorForProcess } from '../utils/processColors'

interface Props {
  frames: (number | null)[]
  highlightFrame?: number | null
}

export default function FrameGrid({ frames, highlightFrame = null }: Props) {
  // Reuse the same color palette as processes, keyed by page number, so
  // colors stay visually consistent with the rest of the app rather than
  // introducing a new palette just for this one view.
  const pageIds = frames.filter((f) => f !== null).map((f) => `PG${f}`)

  return (
    <div className="flex flex-wrap gap-2">
      {frames.map((page, frameIndex) => (
        <div
          key={frameIndex}
          className={`w-20 h-16 rounded-lg border flex flex-col items-center justify-center text-xs ${
            frameIndex === highlightFrame
              ? 'border-amber-400 ring-2 ring-amber-400'
              : 'border-neutral-200 dark:border-neutral-800'
          }`}
          style={{
            backgroundColor: page !== null ? colorForProcess(`PG${page}`, pageIds) : undefined,
          }}
        >
          {page !== null ? (
            <span className="font-semibold text-neutral-950">Page {page}</span>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-600">empty</span>
          )}
          <span className={`text-[10px] mt-0.5 ${page !== null ? 'text-neutral-800' : 'text-neutral-400 dark:text-neutral-600'}`}>
            Frame {frameIndex}
          </span>
        </div>
      ))}
    </div>
  )
}