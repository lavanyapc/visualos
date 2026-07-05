import { motion } from 'framer-motion'
import { GanttSegment } from '../algorithms/cpuScheduling'
import { colorForProcess } from '../utils/processColors'

interface Props {
  segments: GanttSegment[]
  processIds: string[]
  currentTime: number | null
  transitionSeconds: number
}

export default function GanttChart({ segments, processIds, currentTime, transitionSeconds }: Props) {
  if (segments.length === 0) {
    return <p className="text-neutral-500 text-sm">No processes to schedule yet.</p>
  }

  const totalTime = segments[segments.length - 1].end
  const time = currentTime ?? totalTime

  return (
    <div className="w-full">
      <div className="relative w-full h-12 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <div className="flex w-full h-full">
          {segments.map((seg, i) => {
            const widthPercent = ((seg.end - seg.start) / totalTime) * 100
            const duration = seg.end - seg.start
            const elapsed = Math.min(Math.max(time - seg.start, 0), duration)
            const fillPercent = duration === 0 ? 0 : (elapsed / duration) * 100
            const color = colorForProcess(seg.processId, processIds)

            return (
              <div
                key={`${seg.processId}-${seg.start}-${i}`}
                style={{ width: `${widthPercent}%` }}
                className="relative h-full"
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: color }}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ duration: transitionSeconds, ease: 'linear' }}
                />

                <div
                  className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white pointer-events-none"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                >
                  {seg.processId}
                </div>
              </div>
            )
          })}
        </div>

        {currentTime !== null && (
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-neutral-900 dark:bg-white"
            style={{ boxShadow: '0 0 6px rgba(0,0,0,0.5)' }}
            animate={{ left: `${(currentTime / totalTime) * 100}%` }}
            transition={{ duration: transitionSeconds, ease: 'linear' }}
          />
        )}
      </div>

      <div className="relative h-4 mt-1 text-xs text-neutral-500">
        {segments.map((seg, i) => (
          <span key={i} className="absolute -translate-x-1/2" style={{ left: `${(seg.start / totalTime) * 100}%` }}>
            {seg.start}
          </span>
        ))}
        <span className="absolute -translate-x-1/2" style={{ left: '100%' }}>
          {totalTime}
        </span>
      </div>
    </div>
  )
}