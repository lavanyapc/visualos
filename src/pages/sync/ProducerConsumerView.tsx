import { useEffect, useMemo, useState } from 'react'
import BufferView from '../../components/BufferView'
import ExecutionControls from '../../components/ExecutionControls'
import SpeedControl from '../../components/SpeedControl'
import { simulateProducerConsumer } from '../../algorithms/producerConsumer'

export default function ProducerConsumerView() {
  const [bufferSize, setBufferSize] = useState(5)
  const [producerSpeed, setProducerSpeed] = useState(3)
  const [consumerSpeed, setConsumerSpeed] = useState(2)
  const [totalTicks, setTotalTicks] = useState(30)

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => simulateProducerConsumer(bufferSize, producerSpeed, consumerSpeed, totalTicks),
    [bufferSize, producerSpeed, consumerSpeed, totalTicks],
  )
  const totalSteps = result.steps.length

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [bufferSize, producerSpeed, consumerSpeed, totalTicks])

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
    setStepIndex((c) => Math.min(c + 1, totalSteps - 1))
  }
  const handlePrev = () => {
    setIsPlaying(false)
    setStepIndex((c) => Math.max(c - 1, 0))
  }
  const handleReset = () => {
    setIsPlaying(false)
    setStepIndex(0)
  }

  const inputClass =
    'w-16 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  const currentStep = result.steps[Math.min(stepIndex, totalSteps - 1)]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Buffer size</span>
          <input type="number" min={1} value={bufferSize} onChange={(e) => setBufferSize(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Producer speed</span>
          <input type="number" min={1} value={producerSpeed} onChange={(e) => setProducerSpeed(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Consumer speed</span>
          <input type="number" min={1} value={consumerSpeed} onChange={(e) => setConsumerSpeed(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Total ticks</span>
          <input type="number" min={1} value={totalTicks} onChange={(e) => setTotalTicks(Number(e.target.value))} className={inputClass} />
        </label>
      </div>

      {currentStep && <BufferView step={currentStep} />}

      <div className="no-print space-y-3">
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
      </div>
    </div>
  )
}