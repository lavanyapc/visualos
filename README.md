# VisualOS

VisualOS is an interactive web-based Operating Systems laboratory designed to help students understand core Operating Systems concepts through real-time simulations, animations, and performance analysis. The platform transforms theoretical algorithms into interactive visualizations, allowing users to experiment with different inputs and observe how each algorithm behaves step by step.

---

## Features

- Interactive algorithm simulations
- Step-by-step execution with playback controls
- Real-time visualization of algorithm execution
- Performance metrics and analysis
- Responsive user interface
- Light and Dark themes
- Export simulation results as PDF
- Persistent navigation between modules

---

# Modules

## CPU Scheduling

### Supported Algorithms

- First Come First Served (FCFS)
- Shortest Job First (SJF)
- Shortest Remaining Time First (SRTF)
- Priority Scheduling
- Round Robin (Configurable Time Quantum)

### Features

- Interactive process table
- Animated Gantt Chart
- Ready Queue visualization
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Waiting Time calculation
- Turnaround Time calculation
- Response Time calculation
- Formula reference panel
- Challenge Mode

---

## Disk Scheduling

### Supported Algorithms

- First Come First Served (FCFS)
- Shortest Seek Time First (SSTF)
- SCAN
- LOOK
- C-SCAN

### Features

- Interactive disk request input
- Adjustable disk size
- Configurable initial head position
- Direction selection for SCAN and LOOK
- Animated disk head movement
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Total seek distance
- Average seek distance
- Request servicing order visualization

---

## Memory Allocation

### Supported Algorithms

- First Fit
- Best Fit
- Worst Fit
- Next Fit

### Features

- Interactive memory block configuration
- Interactive process allocation
- Memory layout visualization
- Internal fragmentation analysis
- Unallocated process detection
- Total fragmentation statistics
- Average fragmentation statistics

---

## Paging

### Features

- Configurable process size
- Configurable page size
- Configurable physical memory size
- Automatic page table generation
- Logical to physical address translation
- Physical memory visualization
- Page table visualization
- Page fault detection
- Step-by-step address translation with formulas

---

## Page Replacement

### Supported Algorithms

- FIFO (First In First Out)
- Least Recently Used (LRU)
- Optimal Page Replacement
- Clock (Second Chance)

### Features

- Configurable number of frames
- Custom page reference string input
- Step-by-step page replacement visualization
- Real-time frame updates
- Page hit and page fault highlighting
- Hit and fault statistics
- Hit ratio and fault ratio calculation
- Playback controls
- Adjustable simulation speed

---

# Application Workflow

1. **Welcome Screen**
   - Animated landing page introducing the application.

2. **Module Selection**
   - Interactive cards for selecting an Operating Systems topic.

3. **Simulation Modules**
   - Hands-on simulations with configurable inputs.
   - Persistent navigation bar for seamless switching between modules.
   - Theme switching available throughout the application.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite

## Styling

- Tailwind CSS

## Animation

- Framer Motion
- GSAP
- OGL

---

# Installation

Clone the repository:

```bash
git clone https://github.com/lavanyapc/visualos.git
```

Navigate to the project directory:

```bash
cd visualos
```

Install dependencies:

```bash
npm install
```

Run the development server:

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
│   └── PageReplacement.tsx
│
├── utils/
├── types.ts
├── App.tsx
└── main.tsx
```

---

# Planned Modules

## Process Synchronization

- Producer-Consumer Problem
- Dining Philosophers Problem
- Readers-Writers Problem

## Future Enhancements

### Modules-Deadlock

- Deadlock Detection
- Banker's Algorithm
  
### General Enhancements 
- Interactive algorithm comparison
- Performance comparison across algorithms
- Improved analytics dashboard
- Save and share simulation configurations

---

# Project Goal

VisualOS aims to bridge the gap between Operating Systems theory and practical understanding by providing interactive, real-time simulations of fundamental algorithms. The project is designed as a learning platform for students to explore algorithm behavior, compare different approaches, and develop a deeper understanding of Operating Systems concepts through visualization.
