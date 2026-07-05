# VisualOS

An interactive web-based Operating Systems lab for visualizing and learning core OS algorithms through real-time simulations and performance analysis.

## Current Module

### CPU Scheduling
- FCFS (First Come First Served)
- SJF (Non-Preemptive)
- SRTF (Preemptive)
- Priority Scheduling
- Round Robin (Adjustable Time Quantum)

## Features

- Interactive process table
- Animated Gantt chart
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Live Ready Queue visualization
- Performance metrics (WT, TAT, RT)
- Formula reference
- Challenge Mode
- Light & Dark themes
- Animated WebGL background

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- OGL (WebGL)

## Installation

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
src/
├── algorithms/
├── components/
├── types/
├── App.tsx
└── main.tsx
```

## Future Development

- Memory Allocation Algorithms
  - First Fit
  - Best Fit
  - Worst Fit
  - Next Fit

- Paging & Page Replacement
  - FIFO
  - LRU
  - Optimal
  - Clock

- Disk Scheduling
  - FCFS
  - SSTF
  - SCAN
  - C-SCAN
  - LOOK
  - C-LOOK

- Deadlock Detection & Banker's Algorithm

- Process Synchronization
  - Producer–Consumer
  - Dining Philosophers
  - Readers–Writers

- Interactive algorithm comparison

- Export simulation reports

- More educational visualizations and animations

