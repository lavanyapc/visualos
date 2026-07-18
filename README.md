# VisualOS

An interactive web-based Operating Systems laboratory for visualizing and learning core OS algorithms through real-time simulations, animations, and performance analysis.

VisualOS transforms traditional Operating Systems learning into an interactive experience where users can experiment with algorithms, observe their execution step by step, compare their behavior, and analyze their performance—all through an intuitive and visually engaging interface.

---

## Overview

Operating Systems concepts are often challenging to understand because they involve multiple processes, scheduling decisions, memory operations, and synchronization occurring simultaneously. While textbooks explain the theory, VisualOS allows users to **see** these algorithms in action.

With interactive visualizations, configurable inputs, playback controls, and real-time metrics, VisualOS helps learners understand how different algorithms behave and how their performance varies under different scenarios.

---

## App Flow

### 1. Welcome Screen

- Animated landing page with interactive module preview cards.

### 2. Module Selection

- Choose an Operating Systems topic to explore.
- This screen is displayed only once during startup.

### 3. Module Pages

- Each module provides an interactive simulation.
- A persistent navigation bar allows switching between modules and toggling the application theme at any time.

---

# Modules

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

## Paging

### Features

- Configurable process size, page size, and physical memory size
- Automatic page table generation, with unmapped pages shown when a process exceeds available frames
- Logical-to-physical address translation, with the page number and offset formulas shown step by step
- Physical memory frame grid, highlighting the exact frame a translated address resolves to
- Page table view, highlighting the exact page a translated address looked up
- Page fault detection for addresses referencing pages not currently loaded

---

## Page Replacement

### Algorithms

- FIFO (First In First Out)
- LRU (Least Recently Used)
- Optimal
- Clock (Second-Chance)

### Features

- Editable reference string and configurable frame count
- Step-by-step animated frame timeline
- Reference string strip showing hits and faults at a glance
- Eviction tracking, showing which page was replaced on each fault
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Page fault count, hit count, and fault rate metrics

---

## Process Synchronization

### Problems

- Producer-Consumer
- Dining Philosophers
- Readers-Writers

### Features

- Tick-based, deterministic simulations for all three classic problems
- **Producer-Consumer:** Configurable buffer size and relative producer/consumer speed; visualizes buffer fill state and blocking (buffer full / buffer empty) conditions
- **Dining Philosophers:** Configurable philosopher count and think/eat durations; circular table visualization with live Thinking, Hungry, and Eating states, along with fork ownership using lowest-numbered-fork-first ordering to avoid deadlock
- **Readers-Writers:** Editable request queue (read or write, with arrival time); FCFS-fair scheduling that prevents writer starvation, with live active readers, active writer, and waiting queue display
- Shared Play, Pause, Step, and Reset controls
- Adjustable simulation speed

---

# App-wide Features

- Light and Dark themes
- Interactive animated module cards on the Welcome screen
- Persistent navigation bar for switching modules and themes
- Export simulation results as PDF
- Shared playback architecture across applicable modules

---

# Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- OGL (WebGL background)
- GSAP (Welcome screen card interactions)

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
│   ├── paging.ts
│   ├── pageReplacement.ts
│   ├── producerConsumer.ts
│   ├── diningPhilosophers.ts
│   ├── readersWriters.ts
│   └── timeline.ts
│
├── components/
│
├── pages/
│   ├── Welcome.tsx
│   ├── ModuleSelect.tsx
│   ├── CPUScheduling.tsx
│   ├── DiskScheduling.tsx
│   ├── MemoryAllocation.tsx
│   ├── Paging.tsx
│   ├── PageReplacement.tsx
│   ├── ProcessSynchronization.tsx
│   └── sync/
│       ├── ProducerConsumerView.tsx
│       ├── DiningPhilosophersView.tsx
│       └── ReadersWritersView.tsx
│
├── utils/
├── types.ts
├── App.tsx
└── main.tsx
```

---

# Goal

VisualOS aims to make Operating Systems concepts easier to understand through interactive simulations, animations, and real-time performance analysis. By turning six major areas of a typical Operating Systems course into interactive experiences, the platform enables learners to watch algorithms execute, step through each operation, experiment with different inputs, and gain a deeper understanding beyond traditional textbook learning.
