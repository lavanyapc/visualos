export interface DiskSchedulingResult {
  order: number[]        // the sequence of tracks actually visited, in order
  seekSequence: number[] // same as order, but with the starting head position prepended
  totalSeekTime: number  // sum of absolute distances between consecutive positions
  avgSeekTime: number
}

function buildResult(startPosition: number, order: number[]): DiskSchedulingResult {
  const seekSequence = [startPosition, ...order]

  let totalSeekTime = 0
  for (let i = 1; i < seekSequence.length; i++) {
    totalSeekTime += Math.abs(seekSequence[i] - seekSequence[i - 1])
  }

  const avgSeekTime = order.length === 0 ? 0 : totalSeekTime / order.length

  return { order, seekSequence, totalSeekTime, avgSeekTime }
}

export function fcfsDisk(requests: number[], startPosition: number): DiskSchedulingResult {
  // Simplest possible policy: service requests in the exact order they arrived,
  // no matter how far apart they are on the disk.
  return buildResult(startPosition, [...requests])
}

export function sstf(requests: number[], startPosition: number): DiskSchedulingResult {
  // Shortest Seek Time First: from wherever the head currently is, always jump
  // to whichever remaining request is physically closest.
  const remaining = [...requests]
  const order: number[] = []
  let current = startPosition

  while (remaining.length > 0) {
    let closestIndex = 0
    let closestDistance = Math.abs(remaining[0] - current)

    for (let i = 1; i < remaining.length; i++) {
      const distance = Math.abs(remaining[i] - current)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    }

    const next = remaining.splice(closestIndex, 1)[0]
    order.push(next)
    current = next
  }

  return buildResult(startPosition, order)
}
export type Direction = 'up' | 'down'

export function scan(
  requests: number[],
  startPosition: number,
  diskSize: number,
  direction: Direction,
): DiskSchedulingResult {
  // SCAN: the head sweeps all the way to one end of the disk, servicing every
  // request along the way, then reverses and sweeps back. It always
  // physically visits the boundary (0 or diskSize - 1) even if nothing was
  // requested there — like an elevator that always goes to the top floor.
  const sorted = [...requests].sort((a, b) => a - b)
  const smaller = sorted.filter((r) => r < startPosition)
  const larger = sorted.filter((r) => r >= startPosition)

  let order: number[]
  if (direction === 'up') {
    // Service everything >= start (ascending), touch the top boundary,
    // then come back down through everything < start (descending).
    order = [...larger, diskSize - 1, ...[...smaller].reverse()]
  } else {
    // Mirror image: go down first, touch 0, then sweep back up.
    order = [...[...smaller].reverse(), 0, ...larger]
  }

  // Remove the boundary marker if it wasn't actually a real request AND
  // happens to equal an actual request already in the list, to avoid
  // double-counting the same track twice in a row.
  order = order.filter((track, i) => i === 0 || track !== order[i - 1])

  return buildResult(startPosition, order)
}

export function look(
  requests: number[],
  startPosition: number,
  direction: Direction,
): DiskSchedulingResult {
  // LOOK: same idea as SCAN, but the head only goes as far as the LAST
  // actual request in that direction, then reverses immediately — it
  // doesn't bother visiting the physical boundary if nothing's out there.
  const sorted = [...requests].sort((a, b) => a - b)
  const smaller = sorted.filter((r) => r < startPosition)
  const larger = sorted.filter((r) => r >= startPosition)

  let order: number[]
  if (direction === 'up') {
    order = [...larger, ...[...smaller].reverse()]
  } else {
    order = [...[...smaller].reverse(), ...larger]
  }

  return buildResult(startPosition, order)
}

export function cscan(
  requests: number[],
  startPosition: number,
  diskSize: number,
): DiskSchedulingResult {
  // C-SCAN (Circular SCAN): always sweeps in ONE direction (conventionally
  // upward). On reaching the end, it doesn't reverse — it jumps straight
  // back to track 0 and continues upward from there. This keeps wait times
  // more uniform across the whole disk instead of favoring the middle.
  const sorted = [...requests].sort((a, b) => a - b)
  const smaller = sorted.filter((r) => r < startPosition)
  const larger = sorted.filter((r) => r >= startPosition)

  const order = [...larger, diskSize - 1, 0, ...smaller]

  return buildResult(startPosition, order)
}
export type DiskAlgorithm = 'FCFS' | 'SSTF' | 'SCAN' | 'LOOK' | 'CSCAN'

export function runDiskScheduler(
  algorithm: DiskAlgorithm,
  requests: number[],
  startPosition: number,
  diskSize: number,
  direction: Direction,
): DiskSchedulingResult {
  if (requests.length === 0) {
    return { order: [], seekSequence: [startPosition], totalSeekTime: 0, avgSeekTime: 0 }
  }
  switch (algorithm) {
    case 'FCFS':
      return fcfsDisk(requests, startPosition)
    case 'SSTF':
      return sstf(requests, startPosition)
    case 'SCAN':
      return scan(requests, startPosition, diskSize, direction)
    case 'LOOK':
      return look(requests, startPosition, direction)
    case 'CSCAN':
      return cscan(requests, startPosition, diskSize)
  }
}