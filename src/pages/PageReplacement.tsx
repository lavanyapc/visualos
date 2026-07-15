import { useEffect, useMemo, useState } from 'react'
import ReferenceStringInput from '../components/ReferenceStringInput'
import PageReplacementAlgorithmSelector from '../components/PageReplacementAlgorithmSelector'
import PageReplacementTimeline from '../components/PageReplacementTimeline'
import PageReplacementMetrics from '../components/PageReplacementMetrics'
import ExecutionControls from '../components/ExecutionControls'
import SpeedControl from '../components/SpeedControl'
import ExportPDFButton from '../components/ExportPDFButton'
import { PageReplacementAlgorithm, runPageReplacement } from '../algorithms/pageReplacement'

const initialReferenceString = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
const MANUAL_STEP_SECONDS = 0.15

export default function PageReplacement() {
  const [referenceString, setReferenceString] = useState<number[]>(initialReferenceString)
  const [numFrames, setNumFrames] = useState(3)
  const [algorithm, setAlgorithm] = useState<PageReplacementAlgorithm>('FIFO')

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => runPageReplacement(algorithm, referenceString, numFrames),
    [algorithm, referenceString, numFrames],
  )

  const totalSteps = result.steps.length

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [algorithm, referenceString, numFrames])

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

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-semibold">Page Replacement</h1>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Algorithm</h2>
        <PageReplacementAlgorithmSelector value={algorithm} onChange={setAlgorithm} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Setup</h2>
        <ReferenceStringInput
          referenceString={referenceString}
          onChange={setReferenceString}
          numFrames={numFrames}
          onNumFramesChange={setNumFrames}
        />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Simulation</h2>
        <PageReplacementTimeline result={result} referenceString={referenceString} currentStep={stepIndex} />
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
        <PageReplacementMetrics result={result} />
      </section>

      <div className="pt-4 flex justify-end">
        <ExportPDFButton />
      </div>
    </div>
  )
}