import { useEffect, useMemo, useState } from 'react'
import DiskRequestInput from '../components/DiskRequestInput'
import DiskAlgorithmSelector from '../components/DiskAlgorithmSelector'
import DirectionToggle from '../components/DirectionToggle'
import DiskChart from '../components/DiskChart'
import DiskMetricsPanel from '../components/DiskMetricsPanel'
import ExecutionControls from '../components/ExecutionControls'
import SpeedControl from '../components/SpeedControl'
import ExportPDFButton from '../components/ExportPDFButton'
import { DiskAlgorithm, Direction, runDiskScheduler } from '../algorithms/diskScheduling'

const initialRequests = [98, 183, 37, 122, 14, 124, 65, 67]
const MANUAL_STEP_SECONDS = 0.15

export default function DiskScheduling() {
  const [requests, setRequests] = useState<number[]>(initialRequests)
  const [startPosition, setStartPosition] = useState(53)
  const [diskSize, setDiskSize] = useState(200)
  const [algorithm, setAlgorithm] = useState<DiskAlgorithm>('FCFS')
  const [direction, setDirection] = useState<Direction>('up')

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => runDiskScheduler(algorithm, requests, startPosition, diskSize, direction),
    [algorithm, requests, startPosition, diskSize, direction],
  )

  const totalSteps = result.seekSequence.length

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [algorithm, requests, startPosition, diskSize, direction])

  const intervalMs = 1000 / speed

  useEffect(() => {
    if (!isPlaying || totalSteps === 0) return

    const id = setInterval(() => {
      setStepIndex((current) => {
        if (current >= totalSteps - 1) {
          setIsPlaying(false)
          return current
        }
        return current + 1
      })
    }, intervalMs)

    return () => clearInterval(id)
  }, [isPlaying, intervalMs, totalSteps])

  const handlePlayPause = () => {
    if (totalSteps === 0) return
    if (stepIndex >= totalSteps - 1) setStepIndex(0)
    setIsPlaying((p) => !p)
  }

  const handleNext = () => {
    setIsPlaying(false)
    setStepIndex((current) => Math.min(current + 1, totalSteps - 1))
  }

  const handlePrev = () => {
    setIsPlaying(false)
    setStepIndex((current) => Math.max(current - 1, 0))
  }

  const handleReset = () => {
    setIsPlaying(false)
    setStepIndex(0)
  }

  const needsDirection = algorithm === 'SCAN' || algorithm === 'LOOK'
  const transitionSeconds = isPlaying ? intervalMs / 1000 : MANUAL_STEP_SECONDS

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-semibold">Disk Scheduling</h1>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Algorithm</h2>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <DiskAlgorithmSelector value={algorithm} onChange={setAlgorithm} />
          {needsDirection && <DirectionToggle value={direction} onChange={setDirection} />}
        </div>
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Requests</h2>
        <DiskRequestInput
          requests={requests}
          onChange={setRequests}
          startPosition={startPosition}
          onStartPositionChange={setStartPosition}
          diskSize={diskSize}
          onDiskSizeChange={setDiskSize}
        />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Head Movement</h2>
        <DiskChart
          result={result}
          diskSize={diskSize}
          currentStep={stepIndex}
          transitionSeconds={transitionSeconds}
        />
      </section>

      <section className="no-print space-y-3">
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Execution</h2>
        <ExecutionControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={handleReset}
          disableNext={stepIndex >= totalSteps - 1}
          disablePrev={stepIndex <= 0}
        />
        <SpeedControl value={speed} onChange={setSpeed} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Metrics</h2>
        <DiskMetricsPanel result={result} />
      </section>

      <div className="pt-4 flex justify-end">
        <ExportPDFButton />
      </div>
    </div>
  )
}