export type RWRequestType = 'read' | 'write'

export interface RWRequest {
  id: string
  type: RWRequestType
  arrivalTick: number
}

export interface RWStep {
  tick: number
  activeReaders: string[]
  activeWriter: string | null
  waiting: { id: string; type: RWRequestType }[]
}

export interface RWSimulationResult {
  steps: RWStep[]
}

export function simulateReadersWriters(
  requests: RWRequest[],
  readDuration: number,
  writeDuration: number,
  totalTicks: number,
): RWSimulationResult {
  const steps: RWStep[] = []

  const queue: RWRequest[] = [...requests].sort((a, b) => a.arrivalTick - b.arrivalTick)
  let queueIndex = 0

  const activeReaders: { id: string; remaining: number }[] = []
  let activeWriter: { id: string; remaining: number } | null = null
  const pendingWaiting: RWRequest[] = []

  for (let tick = 0; tick < totalTicks; tick++) {
    while (queueIndex < queue.length && queue[queueIndex].arrivalTick <= tick) {
      pendingWaiting.push(queue[queueIndex])
      queueIndex++
    }

    if (activeWriter) {
      activeWriter.remaining--
      if (activeWriter.remaining <= 0) activeWriter = null
    }
    for (let i = activeReaders.length - 1; i >= 0; i--) {
      activeReaders[i].remaining--
      if (activeReaders[i].remaining <= 0) activeReaders.splice(i, 1)
    }

    // FCFS admission, but a writer at the front of the queue blocks any
    // readers behind it from starting — this prevents indefinite writer
    // starvation, which is the classic flaw with naive "readers always
    // welcome" solutions to this problem.
    if (!activeWriter) {
      while (pendingWaiting.length > 0) {
        const next = pendingWaiting[0]

        if (next.type === 'write') {
          if (activeReaders.length === 0) {
            activeWriter = { id: next.id, remaining: writeDuration }
            pendingWaiting.shift()
          }
          break
        } else {
          activeReaders.push({ id: next.id, remaining: readDuration })
          pendingWaiting.shift()
        }
      }
    }

    steps.push({
      tick,
      activeReaders: activeReaders.map((r) => r.id),
      activeWriter: activeWriter ? activeWriter.id : null,
      waiting: pendingWaiting.map((w) => ({ id: w.id, type: w.type })),
    })
  }

  return { steps }
}