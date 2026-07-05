import { Process } from '../types'
import { GanttSegment } from './cpuScheduling'

export interface TimelineFrame {
  time: number
  running: string | null
  readyQueue: string[]
}

export function buildTimeline(processes: Process[], gantt: GanttSegment[]): TimelineFrame[] {
  if (gantt.length === 0) return []

  const totalTime = gantt[gantt.length - 1].end

  const completion: Record<string, number> = {}
  for (const seg of gantt) {
    completion[seg.processId] = seg.end
  }

  const frames: TimelineFrame[] = []

  // Includes t === totalTime as a final "everything finished" frame — without
  // this, playback stops one tick short and the last Gantt segment can never
  // visually reach 100%, which is exactly the "stuck" bug.
  for (let t = 0; t <= totalTime; t++) {
    const runningSeg = gantt.find((seg) => seg.start <= t && t < seg.end)
    const running = runningSeg ? runningSeg.processId : null

    const readyQueue = processes
      .filter((p) => p.arrivalTime <= t && t < completion[p.id] && p.id !== running)
      .sort((a, b) => a.arrivalTime - b.arrivalTime || a.id.localeCompare(b.id))
      .map((p) => p.id)

    frames.push({ time: t, running, readyQueue })
  }

  return frames
}