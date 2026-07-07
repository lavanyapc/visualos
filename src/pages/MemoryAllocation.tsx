import { useMemo, useState } from 'react'
import MemoryBlockInput from '../components/MemoryBlockInput'
import MemoryProcessInput from '../components/MemoryProcessInput'
import MemoryAlgorithmSelector from '../components/MemoryAlgorithmSelector'
import MemoryChart from '../components/MemoryChart'
import MemoryResultsPanel from '../components/MemoryResultsPanel'
import ExportPDFButton from '../components/ExportPDFButton'
import { MemoryBlock, ProcessRequest, MemoryAlgorithm, runMemoryAllocator } from '../algorithms/memoryAllocation'

const initialBlocks: MemoryBlock[] = [
  { id: 'B1', size: 100 },
  { id: 'B2', size: 500 },
  { id: 'B3', size: 200 },
  { id: 'B4', size: 300 },
  { id: 'B5', size: 600 },
]

const initialProcesses: ProcessRequest[] = [
  { id: 'P1', size: 212 },
  { id: 'P2', size: 417 },
  { id: 'P3', size: 112 },
  { id: 'P4', size: 426 },
]

export default function MemoryAllocation() {
  const [blocks, setBlocks] = useState<MemoryBlock[]>(initialBlocks)
  const [processes, setProcesses] = useState<ProcessRequest[]>(initialProcesses)
  const [algorithm, setAlgorithm] = useState<MemoryAlgorithm>('FIRST_FIT')

  const result = useMemo(
    () => runMemoryAllocator(algorithm, blocks, processes),
    [algorithm, blocks, processes],
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-semibold">Memory Allocation</h1>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Algorithm</h2>
        <MemoryAlgorithmSelector value={algorithm} onChange={setAlgorithm} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Setup</h2>
        <MemoryBlockInput blocks={blocks} onChange={setBlocks} />
        <MemoryProcessInput processes={processes} onChange={setProcesses} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Memory Layout</h2>
        <MemoryChart blocks={blocks} result={result} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Results</h2>
        <MemoryResultsPanel result={result} />
      </section>

      <div className="pt-4 flex justify-end">
        <ExportPDFButton />
      </div>
    </div>
  )
}