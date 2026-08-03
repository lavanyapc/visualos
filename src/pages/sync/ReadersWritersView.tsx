import { useEffect, useMemo, useState } from 'react'
import ExecutionControls from '../../components/ExecutionControls'
import SpeedControl from '../../components/SpeedControl'
import { simulateReadersWriters, RWRequest } from '../../algorithms/readersWriters'

const initialRequests: RWRequest[] = [
  { id: 'R1', type: 'read', arrivalTick: 0 },
  { id: 'R2', type: 'read', arrivalTick: 1 },
  { id: 'W1', type: 'write', arrivalTick: 2 },
  { id: 'R3', type: 'read', arrivalTick: 3 },
  { id: 'R4', type: 'read', arrivalTick: 6 },
  { id: 'W2', type: 'write', arrivalTick: 7 },
]

export default function ReadersWritersView() {
  const [requests, setRequests] = useState<RWRequest[]>(initialRequests)
  const [readDuration, setReadDuration] = useState(2)
  const [writeDuration, setWriteDuration] = useState(3)
  const [totalTicks, setTotalTicks] = useState(20)

  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const result = useMemo(
    () => simulateReadersWriters(requests, readDuration, writeDuration, totalTicks),
    [requests, readDuration, writeDuration, totalTicks],
  )
  const totalSteps = result.steps.length

  useEffect(() => {
    setStepIndex(0)
    setIsPlaying(false)
  }, [requests, readDuration, writeDuration, totalTicks])

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

  const updateRequest = (index: number, field: keyof RWRequest, value: string) => {
    const next = [...requests]
    const entry = { ...next[index] }
    if (field === 'arrivalTick') entry.arrivalTick = Number(value)
    else if (field === 'type') entry.type = value as RWRequest['type']
    else entry.id = value
    next[index] = entry
    setRequests(next)
  }

  const removeRequest = (index: number) => {
    setRequests(requests.filter((_, i) => i !== index))
  }

  const addRequest = () => {
    const n = requests.length + 1
    setRequests([...requests, { id: `X${n}`, type: 'read', arrivalTick: 0 }])
  }

  const inputClass =
    'bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  const currentStep = result.steps[Math.min(stepIndex, totalSteps - 1)]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Read duration</span>
          <input
            type="number"
            min={1}
            value={readDuration}
            onChange={(e) => setReadDuration(Number(e.target.value))}
            className={`${inputClass} w-16`}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Write duration</span>
          <input
            type="number"
            min={1}
            value={writeDuration}
            onChange={(e) => setWriteDuration(Number(e.target.value))}
            className={`${inputClass} w-16`}
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400">Total ticks</span>
          <input
            type="number"
            min={1}
            value={totalTicks}
            onChange={(e) => setTotalTicks(Number(e.target.value))}
            className={`${inputClass} w-16`}
          />
        </label>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
        <div className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide mb-2">Requests</div>
        <div className="flex flex-wrap gap-2">
          {requests.map((r, i) => (
            <div key={i} className="flex items-center gap-1">
              <input value={r.id} onChange={(e) => updateRequest(i, 'id', e.target.value)} className={`${inputClass} w-14`} />
              <select
                value={r.type}
                onChange={(e) => updateRequest(i, 'type', e.target.value)}
                className={`${inputClass} w-20`}
              >
                <option value="read">read</option>
                <option value="write">write</option>
              </select>
              <input
                type="number"
                min={0}
                value={r.arrivalTick}
                onChange={(e) => updateRequest(i, 'arrivalTick', e.target.value)}
                className={`${inputClass} w-14`}
              />
              <button
                onClick={() => removeRequest(i)}
                className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-xs"
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addRequest}
            className="px-2 py-1 text-sm text-amber-600 dark:text-amber-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded"
          >
            + add
          </button>
        </div>
      </div>

      {currentStep && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <span className="text-neutral-600 dark:text-neutral-400">Active Readers:</span>
            {currentStep.activeReaders.length === 0 ? (
              <span className="text-neutral-400 dark:text-neutral-600 text-xs">none</span>
            ) : (
              currentStep.activeReaders.map((id) => (
                <span key={id} className="px-2 py-0.5 rounded text-xs font-semibold bg-green-400 text-neutral-950">
                  {id}
                </span>
              ))
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-600 dark:text-neutral-400">Active Writer:</span>
            {currentStep.activeWriter ? (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-400 text-neutral-950">
                {currentStep.activeWriter}
              </span>
            ) : (
              <span className="text-neutral-400 dark:text-neutral-600 text-xs">none</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <span className="text-neutral-600 dark:text-neutral-400">Waiting:</span>
            {currentStep.waiting.length === 0 ? (
              <span className="text-neutral-400 dark:text-neutral-600 text-xs">none</span>
            ) : (
              currentStep.waiting.map((w) => (
                <span
                  key={w.id}
                  className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                >
                  {w.id} ({w.type})
                </span>
              ))
            )}
          </div>
        </div>
      )}

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