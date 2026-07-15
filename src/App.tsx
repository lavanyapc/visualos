import { useState } from 'react'
import Galaxy from './components/Galaxy'
import ThemeToggle, { useTheme } from './components/ThemeToggle'
import Welcome from './pages/Welcome'
import ModuleSelect, { ModuleId } from './pages/ModuleSelect'
import CPUScheduling from './pages/CPUScheduling'
import DiskScheduling from './pages/DiskScheduling'
import MemoryAllocation from './pages/MemoryAllocation'
import Paging from './pages/Paging'
import PageReplacement from './pages/PageReplacement'

type Screen = 'welcome' | 'select' | ModuleId

const NAV_ITEMS: { id: ModuleId; label: string; available: boolean }[] = [
  { id: 'cpu', label: 'CPU Scheduling', available: true },
  { id: 'disk', label: 'Disk Scheduling', available: true },
  { id: 'memory', label: 'Memory Allocation', available: true },
  { id: 'paging', label: 'Paging', available: true },
  { id: 'pageReplacement', label: 'Page Replacement', available: true },
  { id: 'sync', label: 'Process Synchronization', available: false },
]

export default function App() {
  const { theme, setTheme } = useTheme()
  const [screen, setScreen] = useState<Screen>('welcome')

  const isModuleScreen = screen !== 'welcome' && screen !== 'select'
  const showGalaxy = theme === 'dark' && screen !== 'welcome'

  const tabClass = (active: boolean, available: boolean) =>
    `px-3 py-1.5 rounded-md text-sm border transition-colors ${
      !available
        ? 'opacity-40 cursor-not-allowed bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600'
        : active
        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
        : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
    }`

  return (
    <div className="relative min-h-screen text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="fixed inset-0 -z-10 bg-white dark:bg-neutral-950 no-print">
        {showGalaxy && (
          <Galaxy
            density={0.9}
            glowIntensity={0.4}
            saturation={0.6}
            hueShift={220}
            speed={0.6}
            mouseInteraction={true}
            mouseRepulsion={true}
            repulsionStrength={1}
            twinkleIntensity={0.4}
            transparent={true}
          />
        )}
      </div>

      {isModuleScreen && (
        <div className="no-print fixed top-0 right-0 z-20 flex items-center gap-3 px-6 py-4">
          <div className="flex gap-2 flex-wrap justify-end">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => item.available && setScreen(item.id)}
                disabled={!item.available}
                className={tabClass(screen === item.id, item.available)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
      )}

      {isModuleScreen && (
        <header className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight">VisualOS</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Operating Systems Visualizer</p>
        </header>
      )}

      <main>
        {screen === 'welcome' && <Welcome onStart={() => setScreen('select')} />}
        {screen === 'select' && <ModuleSelect onSelect={(m) => setScreen(m)} />}
        {screen === 'cpu' && <CPUScheduling />}
        {screen === 'disk' && <DiskScheduling />}
        {screen === 'memory' && <MemoryAllocation />}
        {screen === 'paging' && <Paging />}
        {screen === 'pageReplacement' && <PageReplacement />}
      </main>
    </div>
  )
}