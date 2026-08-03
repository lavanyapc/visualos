export type PCAction =
  | { type: 'produce'; item: number }
  | { type: 'consume'; item: number }
  | { type: 'blocked-full' }
  | { type: 'blocked-empty' }

export interface PCStep {
  tick: number
  action: PCAction
  buffer: (number | null)[]
  producedCount: number
  consumedCount: number
}

export interface PCSimulationResult {
  steps: PCStep[]
  bufferSize: number
}

export function simulateProducerConsumer(
  bufferSize: number,
  producerSpeed: number,
  consumerSpeed: number,
  totalTicks: number,
): PCSimulationResult {
  const buffer: (number | null)[] = new Array(bufferSize).fill(null)
  const steps: PCStep[] = []

  let nextItem = 0
  let producedCount = 0
  let consumedCount = 0
  let producerCredits = 0
  let consumerCredits = 0

  const firstEmptySlot = () => buffer.indexOf(null)
  const firstFilledSlot = () => buffer.findIndex((b) => b !== null)

  for (let tick = 0; tick < totalTicks; tick++) {
    producerCredits += producerSpeed
    consumerCredits += consumerSpeed

    const producerTurn = producerCredits >= consumerCredits
    producerCredits = 0
    consumerCredits = 0

    if (producerTurn) {
      const slot = firstEmptySlot()
      if (slot === -1) {
        steps.push({ tick, action: { type: 'blocked-full' }, buffer: [...buffer], producedCount, consumedCount })
      } else {
        buffer[slot] = nextItem
        producedCount++
        steps.push({
          tick,
          action: { type: 'produce', item: nextItem },
          buffer: [...buffer],
          producedCount,
          consumedCount,
        })
        nextItem++
      }
    } else {
      const slot = firstFilledSlot()
      if (slot === -1) {
        steps.push({ tick, action: { type: 'blocked-empty' }, buffer: [...buffer], producedCount, consumedCount })
      } else {
        const item = buffer[slot]!
        buffer[slot] = null
        consumedCount++
        steps.push({
          tick,
          action: { type: 'consume', item },
          buffer: [...buffer],
          producedCount,
          consumedCount,
        })
      }
    }
  }

  return { steps, bufferSize }
}