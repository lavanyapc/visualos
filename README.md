# VisualOS

An interactive web-based Operating Systems lab for visualizing and learning core OS algorithms through real-time simulations and performance analysis.

---

# App Flow

1. **Welcome Screen**
   - Animated landing page with interactive module preview cards.

2. **Module Selection**
   - Choose an Operating Systems topic to explore.
   - This screen is displayed only once during startup.

3. **Module Pages**
   - Each module provides an interactive simulation.
   - A persistent navigation bar allows switching between modules and toggling the application theme at any time.

---

# Current Modules

## CPU Scheduling

### Algorithms
- FCFS (First Come First Served)
- SJF (Non-Preemptive)
- SRTF (Shortest Remaining Time First)
- Priority Scheduling
- Round Robin (Adjustable Time Quantum)

### Features
- Interactive process table
- Animated Gantt chart
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Live Ready Queue visualization
- Waiting, Turnaround, and Response Time metrics
- Formula reference panel
- Challenge Mode

---

## Disk Scheduling

### Algorithms
- FCFS (First Come First Served)
- SSTF (Shortest Seek Time First)
- SCAN
- LOOK
- C-SCAN

### Features
- Interactive request input
- Adjustable disk size and initial head position
- Direction control for SCAN and LOOK
- Animated disk head movement
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Total and average seek time metrics
- Complete request servicing order

---

## Memory Allocation

### Algorithms
- First Fit
- Best Fit
- Worst Fit
- Next Fit

### Features
- Interactive memory block and process allocation
- Visual memory layout
- Internal fragmentation analysis
- Unallocated process detection
- Total and average fragmentation metrics

---

# App-wide Features

- Light and Dark themes
- Interactive animated module cards
- Persistent navigation bar
- Export simulation results as PDF
- Shared playback architecture across all modules

---

# Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- OGL 
- GSAP

---

# Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

# Project Structure

```text
src/
├── algorithms/
│   ├── cpuScheduling.ts
│   ├── diskScheduling.ts
│   ├── memoryAllocation.ts
│   └── timeline.ts
│
├── components/
│
├── pages/
│   ├── Welcome.tsx
│   ├── ModuleSelect.tsx
│   ├── CPUScheduling.tsx
│   ├── DiskScheduling.tsx
│   └── MemoryAllocation.tsx
│
├── utils/
├── types.ts
├── App.tsx
└── main.tsx
```

---

# Future Development

## Memory Management

- Paging
- Page Replacement
  - FIFO
  - LRU
  - Optimal
  - Clock

## Deadlocks

- Deadlock Detection
- Banker's Algorithm

## Process Synchronization

- Producer–Consumer
- Dining Philosophers
- Readers–Writers

## Planned Features

- Interactive algorithm comparison
- More educational visualizations
- Additional animations and playback improvements
- Performance analytics across algorithms

---

# Goal

VisualOS aims to make Operating Systems concepts easier to understand through interactive simulations, animations, and real-time performance analysis, providing an engaging platform for learning core OS concepts.
