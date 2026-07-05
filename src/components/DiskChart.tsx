import { motion } from 'framer-motion'
import { DiskSchedulingResult } from '../algorithms/diskScheduling'

interface Props {
  result: DiskSchedulingResult
  diskSize: number
  currentStep: number
  transitionSeconds: number
}

const WIDTH = 600
const HEIGHT = 300
const PADDING = 30

export default function DiskChart({ result, diskSize, currentStep, transitionSeconds }: Props) {
  const { seekSequence } = result

  if (seekSequence.length < 2) {
    return <p className="text-neutral-500 text-sm">Add requests to see head movement.</p>
  }

  const usableWidth = WIDTH - PADDING * 2
  const usableHeight = HEIGHT - PADDING * 2

  const points = seekSequence.map((track, i) => {
    const x = PADDING + (i / (seekSequence.length - 1)) * usableWidth
    const y = PADDING + (track / (diskSize - 1)) * usableHeight
    return { x, y, track }
  })

  const step = Math.min(Math.max(currentStep, 0), points.length - 1)

  const pastPoints = points.slice(0, step + 1)
  const futurePoints = points.slice(step)

  const pastPathD = pastPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const futurePathD = futurePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const head = points[step]

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto max-w-2xl">
        <text x={4} y={PADDING} fontSize="10" fill="currentColor" className="text-neutral-500">
          0
        </text>
        <text x={4} y={HEIGHT - PADDING + 4} fontSize="10" fill="currentColor" className="text-neutral-500">
          {diskSize - 1}
        </text>

        {/* The part of the journey not yet reached — faint and dashed,
            so the overall shape is visible up front without looking "done". */}
        {futurePoints.length > 1 && (
          <path
            d={futurePathD}
            fill="none"
            stroke="#f2b84b"
            strokeOpacity={0.25}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        )}

        {/* The part actually traveled so far — solid, full color */}
        {pastPoints.length > 1 && (
          <path d={pastPathD} fill="none" stroke="#f2b84b" strokeWidth={2} />
        )}

        {/* Dots + labels for every stop, dimmed if not reached yet */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill={i === 0 ? '#a78bfa' : '#f2b84b'}
              opacity={i <= step ? 1 : 0.3}
            />
            <text
              x={p.x}
              y={p.y - 10}
              fontSize="10"
              textAnchor="middle"
              fill="currentColor"
              className={i <= step ? 'text-neutral-600 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-700'}
            >
              {p.track}
            </text>
          </g>
        ))}

        {/* The moving head marker — animates smoothly between stops rather
            than jumping, using the same transitionSeconds pattern as the
            CPU Gantt chart's playhead. */}
        <motion.circle
          r={7}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          animate={{ cx: head.x, cy: head.y }}
          transition={{ duration: transitionSeconds, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}