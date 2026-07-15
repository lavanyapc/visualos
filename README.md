# VisualOS

VisualOS is an interactive web-based Operating Systems laboratory designed to help students understand fundamental Operating Systems concepts through real-time simulations, animations, and performance analysis. The application enables users to experiment with different algorithms, visualize their execution, and compare their performance in an intuitive learning environment.

---

## Application Flow

1. **Welcome Screen**
   - Animated landing page introducing the platform.
   - Interactive preview cards showcasing the available modules.

2. **Module Selection**
   - Select an Operating Systems topic to explore.
   - Displayed only during the initial launch of the application.

3. **Simulation Modules**
   - Each module provides an interactive simulation of a specific Operating Systems concept.
   - A persistent navigation bar allows seamless navigation between modules and supports theme switching throughout the application.

---

# Modules

## CPU Scheduling

### Supported Algorithms

- First Come First Served (FCFS)
- Shortest Job First (SJF - Non-Preemptive)
- Shortest Remaining Time First (SRTF)
- Priority Scheduling
- Round Robin (Configurable Time Quantum)

### Features

- Interactive process table
- Animated Gantt Chart
- Ready Queue visualization
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Automatic calculation of:
  - Waiting Time
  - Turnaround Time
  - Response Time
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

- Interactive request input
- Configurable disk size
- Adjustable initial head position
- Direction control for SCAN and LOOK
- Animated disk head movement
- Play, Pause, Step, and Reset controls
- Adjustable simulation speed
- Total seek distance calculation
- Average seek distance calculation
- Complete request servicing order visualization

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
- Visual memory layout
- Internal fragmentation analysis
- Detection of unallocated processes
- Total fragmentation statistics
- Average fragmentation statistics

---

## Paging

### Features

- Configurable process size
- Configurable page size
- Configurable physical memory size
- Automatic page table generation
- Unmapped page visualization when insufficient frames are available
- Step-by-step logical-to-physical address translation
- Formula display for page number and offset calculations
- Physical memory visualization with highlighted frame
- Page table visualization with highlighted page lookup
- Page fault detection for unmapped pages

---

# Application Features

- Light and Dark themes
- Responsive user interface
- Interactive module cards
- Persistent navigation bar
- PDF export for simulation results
- Shared playback architecture across supported simulations
- Smooth animations using Framer Motion and GSAP

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

Start the development server:

```bash
npm run dev
```

Build the project:

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
│   └── Paging.tsx
│
├── utils/
├── types.ts
├── App.tsx
└── main.tsx
```

---

# Planned Enhancements

## Memory Management- Page replacement 

- FIFO Page Replacement
- Least Recently Used (LRU)
- Optimal Page Replacement
- Clock Page Replacement

## Deadlock Management

- Deadlock Detection
- Banker's Algorithm

## Future Improvements

- Interactive algorithm comparison
- Side-by-side performance analysis
- Enhanced educational visualizations
- Additional playback controls
- Performance analytics dashboard

---

# Project Goal

VisualOS aims to bridge the gap between theory and practice by transforming Operating Systems concepts into interactive simulations. Through real-time execution, dynamic visualizations, and performance metrics, the platform provides an engaging environment for students to explore, experiment with, and better understand core Operating Systems algorithms.
