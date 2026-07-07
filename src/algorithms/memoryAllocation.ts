export interface MemoryBlock {
  id: string
  size: number
}

export interface ProcessRequest {
  id: string
  size: number
}

export interface Allocation {
  processId: string
  processSize: number
  blockId: string | null // null means it couldn't be allocated anywhere
  blockSize: number | null
  internalFragmentation: number // blockSize - processSize, 0 if unallocated
}

export interface MemoryAllocationResult {
  allocations: Allocation[]
  totalInternalFragmentation: number
  unallocatedCount: number
  // Which block ended up holding which process, for drawing the memory bar.
  // A block not present here is empty.
  blockAssignments: Record<string, string> // blockId -> processId
}

function buildResult(allocations: Allocation[]): MemoryAllocationResult {
  const totalInternalFragmentation = allocations.reduce((sum, a) => sum + a.internalFragmentation, 0)
  const unallocatedCount = allocations.filter((a) => a.blockId === null).length

  const blockAssignments: Record<string, string> = {}
  for (const a of allocations) {
    if (a.blockId !== null) blockAssignments[a.blockId] = a.processId
  }

  return { allocations, totalInternalFragmentation, unallocatedCount, blockAssignments }
}

export function firstFit(blocks: MemoryBlock[], processes: ProcessRequest[]): MemoryAllocationResult {
  // Each block can only be used once — track which ones are already taken.
  const used = new Set<string>()
  const allocations: Allocation[] = []

  for (const p of processes) {
    // Walk the blocks in the order given, take the FIRST one big enough.
    const block = blocks.find((b) => !used.has(b.id) && b.size >= p.size)

    if (block) {
      used.add(block.id)
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: block.id,
        blockSize: block.size,
        internalFragmentation: block.size - p.size,
      })
    } else {
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: null,
        blockSize: null,
        internalFragmentation: 0,
      })
    }
  }

  return buildResult(allocations)
}

export function bestFit(blocks: MemoryBlock[], processes: ProcessRequest[]): MemoryAllocationResult {
  const used = new Set<string>()
  const allocations: Allocation[] = []

  for (const p of processes) {
    // Among ALL blocks big enough, pick the one that leaves the LEAST
    // leftover space — the "tightest" fit, minimizing wasted room.
    const candidates = blocks.filter((b) => !used.has(b.id) && b.size >= p.size)
    const block = candidates.sort((a, b) => a.size - b.size)[0]

    if (block) {
      used.add(block.id)
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: block.id,
        blockSize: block.size,
        internalFragmentation: block.size - p.size,
      })
    } else {
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: null,
        blockSize: null,
        internalFragmentation: 0,
      })
    }
  }

  return buildResult(allocations)
}

export function worstFit(blocks: MemoryBlock[], processes: ProcessRequest[]): MemoryAllocationResult {
  const used = new Set<string>()
  const allocations: Allocation[] = []

  for (const p of processes) {
    // The opposite of Best Fit: pick the LARGEST available block, on the
    // theory that leaving a big leftover chunk is more reusable later
    // than lots of tiny unusable fragments.
    const candidates = blocks.filter((b) => !used.has(b.id) && b.size >= p.size)
    const block = candidates.sort((a, b) => b.size - a.size)[0]

    if (block) {
      used.add(block.id)
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: block.id,
        blockSize: block.size,
        internalFragmentation: block.size - p.size,
      })
    } else {
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: null,
        blockSize: null,
        internalFragmentation: 0,
      })
    }
  }

  return buildResult(allocations)
}

export function nextFit(blocks: MemoryBlock[], processes: ProcessRequest[]): MemoryAllocationResult {
  const used = new Set<string>()
  const allocations: Allocation[] = []

  // Unlike First Fit, Next Fit remembers where it left off and resumes
  // searching FROM there next time, wrapping around to the start if needed
  // — instead of always restarting the scan from block 0.
  let lastIndex = 0

  for (const p of processes) {
    let foundIndex = -1

    for (let offset = 0; offset < blocks.length; offset++) {
      const index = (lastIndex + offset) % blocks.length
      const block = blocks[index]
      if (!used.has(block.id) && block.size >= p.size) {
        foundIndex = index
        break
      }
    }

    if (foundIndex !== -1) {
      const block = blocks[foundIndex]
      used.add(block.id)
      lastIndex = foundIndex // resume from here next time, not from 0
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: block.id,
        blockSize: block.size,
        internalFragmentation: block.size - p.size,
      })
    } else {
      allocations.push({
        processId: p.id,
        processSize: p.size,
        blockId: null,
        blockSize: null,
        internalFragmentation: 0,
      })
    }
  }

  return buildResult(allocations)
}

export type MemoryAlgorithm = 'FIRST_FIT' | 'BEST_FIT' | 'WORST_FIT' | 'NEXT_FIT'

export function runMemoryAllocator(
  algorithm: MemoryAlgorithm,
  blocks: MemoryBlock[],
  processes: ProcessRequest[],
): MemoryAllocationResult {
  if (blocks.length === 0 || processes.length === 0) {
    return { allocations: [], totalInternalFragmentation: 0, unallocatedCount: 0, blockAssignments: {} }
  }
  switch (algorithm) {
    case 'FIRST_FIT':
      return firstFit(blocks, processes)
    case 'BEST_FIT':
      return bestFit(blocks, processes)
    case 'WORST_FIT':
      return worstFit(blocks, processes)
    case 'NEXT_FIT':
      return nextFit(blocks, processes)
  }
}