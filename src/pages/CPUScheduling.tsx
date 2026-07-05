import { useEffect, useMemo, useState } from 'react'
import ProcessTable from '../components/ProcessTable'
import GanttChart from '../components/GanttChart'
import MetricsPanel from '../components/MetricsPanel'
import FormulaReference from '../components/FormulaReference'
import AlgorithmSelector from '../components/AlgorithmSelector'
import QuantumSlider from '../components/QuantumSlider'
import ChallengeMode from '../components/ChallengeMode'
import ExecutionControls from '../components/ExecutionControls'
import SpeedControl from '../components/SpeedControl'
import ReadyQueueView from '../components/ReadyQueueView'
import { Process } from '../types'
import { Algorithm, runScheduler } from '../algorithms/cpuScheduling'
import { buildTimeline } from '../algorithms/timeline'

const initialProcesses: Process[] = [
  { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1 },
  { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2 },
]

const GUESS_TOLERANCE = 0.5
const MANUAL_STEP_SECONDS = 0.15

type AppMode = 'learn' | 'challenge'

interface ChallengeResult {
  guess: number
  correct: boolean
  actual: number
}

export default function CPUScheduling() {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses)
  const [algorithm, setAlgorithm] = useState<Algorithm>('FCFS')
  const [quantum, setQuantum] = useState(2)
  const [mode, setMode] = useState<AppMode>('learn')

  const [revealed, setRevealed] = useState(false)
  const [lastChallenge, setLastChallenge] = useState<ChallengeResult | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const [frameIndex, setFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => runScheduler(algorithm, processes, quantum),
    [algorithm, processes, quantum],
  )
  const processIds = processes.map((p) => p.id)
  const timeline = useMemo(() => buildTimeline(processes, result.gantt), [processes, result.gantt])

  useEffect(() => {
    setRevealed(false)
    setLastChallenge(null)
    setFrameIndex(0)
    setIsPlaying(false)
  }, [algorithm, processes, quantum])

  const intervalMs = 1000 / speed

  useEffect(() => {
    if (!isPlaying || timeline.length === 0) return

    const id = setInterval(() => {
      setFrameIndex((current) => {
        if (current >= timeline.length - 1) {
          setIsPlaying(false)
          return current
        }
        return current + 1
      })
    }, intervalMs)

    return () => clearInterval(id)
  }, [isPlaying, intervalMs, timeline.length])

  const handleChallengeSubmit = (guess: number) => {
    const diff = Math.abs(guess - result.avgWaitingTime)
    const correct = diff <= GUESS_TOLERANCE
    setLastChallenge({ guess, correct, actual: result.avgWaitingTime })
    setRevealed(true)
    setAttempts((a) => a + 1)
    if (correct) setScore((s) => s + 10)
  }

  const handlePlayPause = () => {
    if (timeline.length === 0) return
    if (frameIndex >= timeline.length - 1) setFrameIndex(0)
    setIsPlaying((p) => !p)
  }

  const handleNext = () => {
    setIsPlaying(false)
    setFrameIndex((current) => Math.min(current + 1, timeline.length - 1))
  }

  const handlePrev = () => {
    setIsPlaying(false)
    setFrameIndex((current) => Math.max(current - 1, 0))
  }

  const handleReset = () => {
    setIsPlaying(false)
    setFrameIndex(0)
  }

  const showResults = mode === 'learn' || revealed
  const currentFrame = timeline[frameIndex] ?? null
  const ganttTransitionSeconds = isPlaying ? intervalMs / 1000 : MANUAL_STEP_SECONDS

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg font-semibold">CPU Scheduling</h1>
        <div className="flex items-center gap-3">
          {mode === 'challenge' && (
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Score: <span className="text-amber-600 dark:text-amber-400 font-semibold">{score}</span>
              {' / '}
              {attempts * 10}
            </span>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setMode('learn')}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                mode === 'learn'
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Learn Mode
            </button>
            <button
              onClick={() => setMode('challenge')}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                mode === 'challenge'
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Challenge Mode
            </button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Algorithm</h2>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />
          {algorithm === 'RR' && <QuantumSlider value={quantum} onChange={setQuantum} />}
        </div>
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Processes</h2>
        <ProcessTable
          processes={processes}
          onChange={setProcesses}
          showPriority={algorithm === 'PRIORITY'}
        />
      </section>

      {!showResults && (
        <section>
          <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Challenge</h2>
          <ChallengeMode onSubmit={handleChallengeSubmit} />
        </section>
      )}

      {showResults && (
        <>
          {mode === 'challenge' && lastChallenge && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                lastChallenge.correct
                  ? 'border-green-400 dark:border-green-700 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-300'
                  : 'border-red-400 dark:border-red-700 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300'
              }`}
            >
              {lastChallenge.correct ? 'Correct.' : 'Not quite.'} You guessed{' '}
              <span className="font-semibold">{lastChallenge.guess}</span>, actual average waiting
              time is <span className="font-semibold">{lastChallenge.actual.toFixed(2)}</span>.
            </div>
          )}

          <section>
            <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Gantt Chart</h2>
            <GanttChart
              segments={result.gantt}
              processIds={processIds}
              currentTime={currentFrame ? currentFrame.time : null}
              transitionSeconds={ganttTransitionSeconds}
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Execution</h2>
            <ExecutionControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrev={handlePrev}
              onReset={handleReset}
              disableNext={frameIndex >= timeline.length - 1}
              disablePrev={frameIndex <= 0}
            />
            <SpeedControl value={speed} onChange={setSpeed} />
            <ReadyQueueView
              queue={currentFrame ? currentFrame.readyQueue : []}
              running={currentFrame ? currentFrame.running : null}
              processIds={processIds}
            />
          </section>

          <section>
            <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Metrics</h2>
            <div className="space-y-3">
              <FormulaReference />
              <MetricsPanel result={result} />
            </div>
          </section>
        </>
      )}
    </div>
  )
}