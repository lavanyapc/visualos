export interface FrameState {
  frames: (number | null)[] // current contents of each frame, in order
  isFault: boolean
  evictedPage: number | null // which page (if any) got kicked out this step
}

export interface PageReplacementStep {
  referenceIndex: number
  page: number
  state: FrameState
}

export interface PageReplacementResult {
  steps: PageReplacementStep[]
  totalFaults: number
  totalHits: number
}

function countResult(steps: PageReplacementStep[]): PageReplacementResult {
  const totalFaults = steps.filter((s) => s.state.isFault).length
  const totalHits = steps.length - totalFaults
  return { steps, totalFaults, totalHits }
}

export function fifoReplacement(referenceString: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = new Array(numFrames).fill(null)
  const queue: number[] = [] // tracks INSERTION order, oldest at the front
  const steps: PageReplacementStep[] = []

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]
    const alreadyLoaded = frames.includes(page)

    if (alreadyLoaded) {
      steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: false, evictedPage: null } })
      continue
    }

    let evictedPage: number | null = null
    const emptyIndex = frames.indexOf(null)

    if (emptyIndex !== -1) {
      // A free frame exists — no eviction needed yet.
      frames[emptyIndex] = page
      queue.push(page)
    } else {
      // All frames full — evict whichever page was loaded FIRST (front of queue).
      evictedPage = queue.shift()!
      const evictIndex = frames.indexOf(evictedPage)
      frames[evictIndex] = page
      queue.push(page)
    }

    steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: true, evictedPage } })
  }

  return countResult(steps)
}

export function lruReplacement(referenceString: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = new Array(numFrames).fill(null)
  const lastUsed: Record<number, number> = {} // page -> the reference index it was last touched at
  const steps: PageReplacementStep[] = []

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]
    const alreadyLoaded = frames.includes(page)

    if (alreadyLoaded) {
      lastUsed[page] = i // touching it updates recency, even on a hit
      steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: false, evictedPage: null } })
      continue
    }

    let evictedPage: number | null = null
    const emptyIndex = frames.indexOf(null)

    if (emptyIndex !== -1) {
      frames[emptyIndex] = page
    } else {
      // Evict whichever currently-loaded page has the SMALLEST lastUsed
      // value — i.e. was touched longest ago.
      let oldestPage = frames[0]!
      for (const f of frames) {
        if (f !== null && lastUsed[f] < lastUsed[oldestPage]) oldestPage = f
      }
      evictedPage = oldestPage
      const evictIndex = frames.indexOf(evictedPage)
      frames[evictIndex] = page
    }

    lastUsed[page] = i
    steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: true, evictedPage } })
  }

  return countResult(steps)
}

export function optimalReplacement(referenceString: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = new Array(numFrames).fill(null)
  const steps: PageReplacementStep[] = []

  // For a currently-loaded page, find the NEXT index (after `fromIndex`) at
  // which it's referenced again. If it's never referenced again, treat it
  // as "infinitely far away" — the ideal page to evict.
  const nextUseIndex = (page: number, fromIndex: number): number => {
    for (let j = fromIndex + 1; j < referenceString.length; j++) {
      if (referenceString[j] === page) return j
    }
    return Infinity
  }

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]
    const alreadyLoaded = frames.includes(page)

    if (alreadyLoaded) {
      steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: false, evictedPage: null } })
      continue
    }

    let evictedPage: number | null = null
    const emptyIndex = frames.indexOf(null)

    if (emptyIndex !== -1) {
      frames[emptyIndex] = page
    } else {
      // Evict whichever currently-loaded page is used FARTHEST in the
      // future (or never again) — the theoretical best possible choice.
      let farthestPage = frames[0]!
      let farthestIndex = nextUseIndex(farthestPage, i)
      for (const f of frames) {
        if (f === null) continue
        const idx = nextUseIndex(f, i)
        if (idx > farthestIndex) {
          farthestIndex = idx
          farthestPage = f
        }
      }
      evictedPage = farthestPage
      const evictIndex = frames.indexOf(evictedPage)
      frames[evictIndex] = page
    }

    steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: true, evictedPage } })
  }

  return countResult(steps)
}

export function clockReplacement(referenceString: number[], numFrames: number): PageReplacementResult {
  const frames: (number | null)[] = new Array(numFrames).fill(null)
  const referenceBits: number[] = new Array(numFrames).fill(0)
  let clockHand = 0
  const steps: PageReplacementStep[] = []

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]
    const loadedIndex = frames.indexOf(page)

    if (loadedIndex !== -1) {
      referenceBits[loadedIndex] = 1 // "give it a second chance" going forward
      steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: false, evictedPage: null } })
      continue
    }

    let evictedPage: number | null = null
    const emptyIndex = frames.indexOf(null)

    if (emptyIndex !== -1) {
      frames[emptyIndex] = page
      referenceBits[emptyIndex] = 0
      clockHand = emptyIndex // hand can start here, doesn't strictly matter yet
    } else {
      // Sweep the circular hand: if the current frame's reference bit is 1,
      // give it a second chance (clear the bit, move on) instead of evicting;
      // the first frame found with bit 0 gets evicted.
      while (referenceBits[clockHand] === 1) {
        referenceBits[clockHand] = 0
        clockHand = (clockHand + 1) % numFrames
      }
      evictedPage = frames[clockHand]
      frames[clockHand] = page
      referenceBits[clockHand] = 0
      clockHand = (clockHand + 1) % numFrames
    }

    steps.push({ referenceIndex: i, page, state: { frames: [...frames], isFault: true, evictedPage } })
  }

  return countResult(steps)
}

export type PageReplacementAlgorithm = 'FIFO' | 'LRU' | 'OPTIMAL' | 'CLOCK'

export function runPageReplacement(
  algorithm: PageReplacementAlgorithm,
  referenceString: number[],
  numFrames: number,
): PageReplacementResult {
  if (referenceString.length === 0 || numFrames === 0) {
    return { steps: [], totalFaults: 0, totalHits: 0 }
  }
  switch (algorithm) {
    case 'FIFO':
      return fifoReplacement(referenceString, numFrames)
    case 'LRU':
      return lruReplacement(referenceString, numFrames)
    case 'OPTIMAL':
      return optimalReplacement(referenceString, numFrames)
    case 'CLOCK':
      return clockReplacement(referenceString, numFrames)
  }
}