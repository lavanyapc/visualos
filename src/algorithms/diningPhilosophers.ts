export type PhilosopherState = 'THINKING' | 'HUNGRY' | 'EATING'

export interface DPStep {
  tick: number
  states: PhilosopherState[]
  forkHeldBy: (number | null)[] // index = fork id, value = philosopher holding it
}

export interface DPSimulationResult {
  steps: DPStep[]
  numPhilosophers: number
}

export function simulateDiningPhilosophers(
  numPhilosophers: number,
  thinkDuration: number,
  eatDuration: number,
  totalTicks: number,
): DPSimulationResult {
  const states: PhilosopherState[] = new Array(numPhilosophers).fill('THINKING')
  const stateTimer: number[] = new Array(numPhilosophers).fill(thinkDuration)
  const forkHeldBy: (number | null)[] = new Array(numPhilosophers).fill(null)

  const steps: DPStep[] = []

  const leftFork = (p: number) => p
  const rightFork = (p: number) => (p + 1) % numPhilosophers

  for (let tick = 0; tick < totalTicks; tick++) {
    for (let p = 0; p < numPhilosophers; p++) {
      if (states[p] === 'THINKING') {
        stateTimer[p]--
        if (stateTimer[p] <= 0) states[p] = 'HUNGRY'
      } else if (states[p] === 'HUNGRY') {
        // Always acquire the LOWER-numbered fork first, regardless of
        // which is "left" or "right" for this philosopher. This breaks
        // the circular wait that causes the classic deadlock (everyone
        // grabbing their left fork simultaneously and waiting forever
        // for their right).
        const f1 = Math.min(leftFork(p), rightFork(p))
        const f2 = Math.max(leftFork(p), rightFork(p))

        if (forkHeldBy[f1] === null && forkHeldBy[f2] === null) {
          forkHeldBy[f1] = p
          forkHeldBy[f2] = p
          states[p] = 'EATING'
          stateTimer[p] = eatDuration
        }
        // else stays HUNGRY, retries next tick
      } else if (states[p] === 'EATING') {
        stateTimer[p]--
        if (stateTimer[p] <= 0) {
          forkHeldBy[leftFork(p)] = null
          forkHeldBy[rightFork(p)] = null
          states[p] = 'THINKING'
          stateTimer[p] = thinkDuration
        }
      }
    }

    steps.push({ tick, states: [...states], forkHeldBy: [...forkHeldBy] })
  }

  return { steps, numPhilosophers }
}