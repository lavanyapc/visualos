import { motion } from 'framer-motion'
import { PageReplacementResult } from '../algorithms/pageReplacement'
import { colorForProcess } from '../utils/processColors'

interface Props {
  result: PageReplacementResult
  referenceString: number[]
  currentStep: number
}

export default function PageReplacementTimeline({ result, referenceString, currentStep }: Props) {
  if (result.steps.length === 0) {
    return <p className="text-neutral-500 text-sm">Add a reference string to see the simulation.</p>
  }

  const step = result.steps[Math.min(currentStep, result.steps.length - 1)]
  const pageIds = [...new Set(referenceString)].map((p) => `PG${p}`)

  return (
    <div className="space-y-4">
      {/* Reference string strip: every page reference so far, colored by
          hit (green) or fault (red), with the current one highlighted. */}
      <div className="flex flex-wrap gap-1.5">
        {referenceString.map((page, i) => {
          const pastStep = result.steps[i]
          const isCurrent = i === currentStep
          const isPast = i <= currentStep

          let bg = 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600' // not reached yet
          if (isPast) {
            bg = pastStep.state.isFault
              ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
              : 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
          }

          return (
            <div
              key={i}
              className={`w-9 h-9 rounded-md flex items-center justify-center text-xs font-semibold ${bg} ${
                isCurrent ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              {page}
            </div>
          )
        })}
      </div>

      {/* Current frame contents */}
      <div className="flex flex-wrap gap-2">
        {step.state.frames.map((page, frameIndex) => (
          <motion.div
            key={frameIndex}
            layout
            className="w-20 h-16 rounded-lg border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-xs"
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
          </motion.div>
        ))}
      </div>

      {/* Status line for this exact step */}
      <div className="text-sm">
        {step.state.isFault ? (
          <span className="text-red-600 dark:text-red-400 font-semibold">
            Page Fault — page {step.page} loaded
            {step.state.evictedPage !== null && ` (evicted page ${step.state.evictedPage})`}
          </span>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-semibold">
            Hit — page {step.page} was already in memory
          </span>
        )}
      </div>
    </div>
  )
}
