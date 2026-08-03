import { DPStep } from '../algorithms/diningPhilosophers'

interface Props {
  step: DPStep
}

const STATE_COLORS: Record<string, string> = {
  THINKING: '#8A93A5',
  HUNGRY: '#E5534B',
  EATING: '#6FCF97',
}

const SIZE = 320
const CENTER = SIZE / 2
const RADIUS = 110

export default function PhilosopherTable({ step }: Props) {
  const n = step.states.length
  const angleFor = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2

  const philosopherPos = (i: number) => {
    const angle = angleFor(i)
    return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
  }

  const forkPos = (i: number) => {
    const angle = angleFor(i) + Math.PI / n
    const forkRadius = RADIUS * 0.6
    return { x: CENTER + forkRadius * Math.cos(angle), y: CENTER + forkRadius * Math.sin(angle) }
  }

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-sm mx-auto h-auto">
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS * 0.5}
        fill="none"
        stroke="currentColor"
        className="text-neutral-300 dark:text-neutral-700"
        strokeWidth={1}
      />

      {Array.from({ length: n }, (_, i) => {
        const pos = forkPos(i)
        const held = step.forkHeldBy[i] !== null
        return (
          <rect
            key={`fork-${i}`}
            x={pos.x - 4}
            y={pos.y - 10}
            width={8}
            height={20}
            rx={2}
            fill={held ? '#F2B84B' : '#8A93A5'}
            opacity={held ? 1 : 0.4}
          />
        )
      })}

      {Array.from({ length: n }, (_, i) => {
        const pos = philosopherPos(i)
        const state = step.states[i]
        return (
          <g key={`phil-${i}`}>
            <circle cx={pos.x} cy={pos.y} r={22} fill={STATE_COLORS[state]} />
            <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0B0E14">
              P{i}
            </text>
            <text
              x={pos.x}
              y={pos.y + 38}
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              className="text-neutral-600 dark:text-neutral-300"
            >
              {state}
            </text>
          </g>
        )
      })}
    </svg>
  )
}