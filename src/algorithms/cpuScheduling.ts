import { Process } from '../types'

export type Algorithm = 'FCFS' | 'SJF' | 'SRTF' | 'PRIORITY' | 'RR'

export interface GanttSegment {
  processId: string
  start: number
  end: number
}

export interface ProcessMetrics {
  id: string
  arrivalTime: number
  burstTime: number
  completionTime: number
  turnaroundTime: number
  waitingTime: number
  responseTime: number
}

export interface SchedulingResult {
  gantt: GanttSegment[]
  metrics: ProcessMetrics[]
  avgWaitingTime: number
  avgTurnaroundTime: number
  avgResponseTime: number
}

function buildMetrics(
  processes: Process[],
  completion: Record<string, number>,
  firstResponse: Record<string, number>,
): ProcessMetrics[] {
  return processes.map((p) => {
    const completionTime = completion[p.id]
    const turnaroundTime = completionTime - p.arrivalTime
    const waitingTime = turnaroundTime - p.burstTime
    const responseTime = firstResponse[p.id] - p.arrivalTime
    return {
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime,
    }
  })
}

function buildAverages(metrics: ProcessMetrics[]) {
  const n = metrics.length || 1
  const avgWaitingTime = metrics.reduce((sum, m) => sum + m.waitingTime, 0) / n
  const avgTurnaroundTime = metrics.reduce((sum, m) => sum + m.turnaroundTime, 0) / n
  const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / n
  return { avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

function mergeSegments(segments: GanttSegment[]): GanttSegment[] {
  const merged: GanttSegment[] = []
  for (const seg of segments) {
    const last = merged[merged.length - 1]
    if (last && last.processId === seg.processId && last.end === seg.start) {
      last.end = seg.end
    } else {
      merged.push({ ...seg })
    }
  }
  return merged
}

export function fcfs(processes: Process[]): SchedulingResult {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)

  const gantt: GanttSegment[] = []
  const completion: Record<string, number> = {}
  const firstResponse: Record<string, number> = {}
  let time = 0

  for (const p of sorted) {
    const start = Math.max(time, p.arrivalTime)
    const end = start + p.burstTime

    gantt.push({ processId: p.id, start, end })
    firstResponse[p.id] = start
    completion[p.id] = end
    time = end
  }

  const metrics = buildMetrics(processes, completion, firstResponse)
  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = buildAverages(metrics)

  return { gantt, metrics, avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

export function sjf(processes: Process[]): SchedulingResult {
  const remaining = new Set(processes.map((p) => p.id))
  const byId = Object.fromEntries(processes.map((p) => [p.id, p]))

  const gantt: GanttSegment[] = []
  const completion: Record<string, number> = {}
  const firstResponse: Record<string, number> = {}
  let time = 0

  while (remaining.size > 0) {
    const available = [...remaining]
      .map((id) => byId[id])
      .filter((p) => p.arrivalTime <= time)

    if (available.length === 0) {
      const nextArrival = Math.min(...[...remaining].map((id) => byId[id].arrivalTime))
      time = nextArrival
      continue
    }

    available.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime)
    const p = available[0]

    const start = time
    const end = start + p.burstTime
    gantt.push({ processId: p.id, start, end })
    firstResponse[p.id] = start
    completion[p.id] = end
    time = end
    remaining.delete(p.id)
  }

  const metrics = buildMetrics(processes, completion, firstResponse)
  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = buildAverages(metrics)

  return { gantt, metrics, avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

export function srtf(processes: Process[]): SchedulingResult {
  const remainingBurst: Record<string, number> = Object.fromEntries(
    processes.map((p) => [p.id, p.burstTime]),
  )
  const completion: Record<string, number> = {}
  const firstResponse: Record<string, number> = {}
  const rawSegments: GanttSegment[] = []

  let time = 0
  let completed = 0
  const n = processes.length

  const maxTime = processes.reduce((sum, p) => sum + p.burstTime, 0) +
    Math.max(...processes.map((p) => p.arrivalTime)) + 1

  while (completed < n && time <= maxTime) {
    const available = processes.filter(
      (p) => p.arrivalTime <= time && remainingBurst[p.id] > 0,
    )

    if (available.length === 0) {
      time++
      continue
    }

    available.sort((a, b) => remainingBurst[a.id] - remainingBurst[b.id] || a.arrivalTime - b.arrivalTime)
    const p = available[0]

    if (firstResponse[p.id] === undefined) firstResponse[p.id] = time

    rawSegments.push({ processId: p.id, start: time, end: time + 1 })
    remainingBurst[p.id] -= 1
    time += 1

    if (remainingBurst[p.id] === 0) {
      completion[p.id] = time
      completed++
    }
  }

  const gantt = mergeSegments(rawSegments)
  const metrics = buildMetrics(processes, completion, firstResponse)
  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = buildAverages(metrics)

  return { gantt, metrics, avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

export function priorityScheduling(processes: Process[]): SchedulingResult {
  const remaining = new Set(processes.map((p) => p.id))
  const byId = Object.fromEntries(processes.map((p) => [p.id, p]))

  const gantt: GanttSegment[] = []
  const completion: Record<string, number> = {}
  const firstResponse: Record<string, number> = {}
  let time = 0

  while (remaining.size > 0) {
    const available = [...remaining]
      .map((id) => byId[id])
      .filter((p) => p.arrivalTime <= time)

    if (available.length === 0) {
      const nextArrival = Math.min(...[...remaining].map((id) => byId[id].arrivalTime))
      time = nextArrival
      continue
    }

    available.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime)
    const p = available[0]

    const start = time
    const end = start + p.burstTime
    gantt.push({ processId: p.id, start, end })
    firstResponse[p.id] = start
    completion[p.id] = end
    time = end
    remaining.delete(p.id)
  }

  const metrics = buildMetrics(processes, completion, firstResponse)
  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = buildAverages(metrics)

  return { gantt, metrics, avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

export function roundRobin(processes: Process[], quantum: number): SchedulingResult {
  const n = processes.length
  const arrivalSorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id),
  )

  const remaining: Record<string, number> = Object.fromEntries(
    processes.map((p) => [p.id, p.burstTime]),
  )
  const completion: Record<string, number> = {}
  const firstResponse: Record<string, number> = {}
  const rawSegments: GanttSegment[] = []

  let time = 0
  let idx = 0
  const queue: string[] = []

  const admitArrivals = (uptoTime: number) => {
    while (idx < n && arrivalSorted[idx].arrivalTime <= uptoTime) {
      queue.push(arrivalSorted[idx].id)
      idx++
    }
  }

  admitArrivals(0)
  if (queue.length === 0 && idx < n) {
    time = arrivalSorted[idx].arrivalTime
    admitArrivals(time)
  }

  while (queue.length > 0 || idx < n) {
    if (queue.length === 0) {
      time = arrivalSorted[idx].arrivalTime
      admitArrivals(time)
    }

    const pid = queue.shift()!
    if (firstResponse[pid] === undefined) firstResponse[pid] = time

    const run = Math.min(quantum, remaining[pid])
    const start = time
    time += run
    remaining[pid] -= run
    rawSegments.push({ processId: pid, start, end: time })

    admitArrivals(time)

    if (remaining[pid] > 0) {
      queue.push(pid)
    } else {
      completion[pid] = time
    }
  }

  const gantt = mergeSegments(rawSegments)
  const metrics = buildMetrics(processes, completion, firstResponse)
  const { avgWaitingTime, avgTurnaroundTime, avgResponseTime } = buildAverages(metrics)

  return { gantt, metrics, avgWaitingTime, avgTurnaroundTime, avgResponseTime }
}

export function runScheduler(algorithm: Algorithm, processes: Process[], quantum: number): SchedulingResult {
  if (processes.length === 0) {
    return { gantt: [], metrics: [], avgWaitingTime: 0, avgTurnaroundTime: 0, avgResponseTime: 0 }
  }
  switch (algorithm) {
    case 'FCFS':
      return fcfs(processes)
    case 'SJF':
      return sjf(processes)
    case 'SRTF':
      return srtf(processes)
    case 'PRIORITY':
      return priorityScheduling(processes)
    case 'RR':
      return roundRobin(processes, quantum)
  }
}