import { useEffect, useMemo, useState } from 'react'
import PhilosopherTable from '../../components/PhilosopherTable'
import ExecutionControls from '../../components/ExecutionControls'
import SpeedControl from '../../components/SpeedControl'
import { simulateDiningPhilosophers } from '../../algorithms/diningPhilosophers'

export default function DiningPhilosophersView() {
  const [numPhilosophers, setNumPhilosophers] = useState(5)
  const [thinkDuration, setThinkDuration] = useState(3)
  const [eatDuration, setEatDuration] = useState(2)
  const [totalTicks, setTotalTicks] = useState(30)

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => simulateDiningPhilosophers(numPhilosophers, thinkDuration, eatDuration, totalTicks),
    [numPhilosophers, thinkDuration, eatDuration, totalTicks],
  )
  const totalSteps = result.steps.length

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [numPhilosophers, thinkDuration, eatDuration, totalTicks])

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
          <span className="text-neutral-600 dark:text-neutral-400">Philosophers</span>
          <input type="number" min={2} max={8} value={numPhilosophers} onChange={(e) => setNumPhilosophers(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Think duration</span>
          <input type="number" min={1} value={thinkDuration} onChange={(e) => setThinkDuration(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Eat duration</span>
          <input type="number" min={1} value={eatDuration} onChange={(e) => setEatDuration(Number(e.target.value))} className={inputClass} />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Total ticks</span>
          <input type="number" min={1} value={totalTicks} onChange={(e) => setTotalTicks(Number(e.target.value))} className={inputClass} />
        </label>
      </div>

      {currentStep && <PhilosopherTable step={currentStep} />}

      <div className="flex gap-4 justify-center text-xs text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: '#8A93A5' }} /> Thinking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: '#E5534B' }} /> Hungry
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: '#6FCF97' }} /> Eating
        </span>
      </div>

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