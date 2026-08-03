import { useState } from 'react'
import ProducerConsumerView from './sync/ProducerConsumerView'
import DiningPhilosophersView from './sync/DiningPhilosophersView'
import ReadersWritersView from './sync/ReadersWritersView'
import ExportPDFButton from '../components/ExportPDFButton'

type SyncProblem = 'producerConsumer' | 'diningPhilosophers' | 'readersWriters'

const TABS: { id: SyncProblem; label: string }[] = [
  { id: 'producerConsumer', label: 'Producer-Consumer' },
  { id: 'diningPhilosophers', label: 'Dining Philosophers' },
  { id: 'readersWriters', label: 'Readers-Writers' },
]

export default function ProcessSynchronization() {
  const [problem, setProblem] = useState<SyncProblem>('producerConsumer')

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-semibold">Process Synchronization</h1>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Problem</h2>
        <div className="flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setProblem(t.id)}
              className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                problem === t.id
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        {problem === 'producerConsumer' && <ProducerConsumerView />}
        {problem === 'diningPhilosophers' && <DiningPhilosophersView />}
        {problem === 'readersWriters' && <ReadersWritersView />}
      </section>

      <div className="pt-4 flex justify-end">
        <ExportPDFButton />
      </div>
    </div>
  )
}