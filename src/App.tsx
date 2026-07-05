import { useState } from 'react'
import Galaxy from './components/Galaxy'
import ThemeToggle, { useTheme } from './components/ThemeToggle'
import CPUScheduling from './pages/CPUScheduling'
import DiskScheduling from './pages/DiskScheduling'

type Module = 'cpu' | 'disk'

export default function App() {
  const { theme, setTheme } = useTheme()
  const [module, setModule] = useState<Module>('cpu')

  return (
    <div className="relative min-h-screen text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="fixed inset-0 -z-10 bg-white dark:bg-neutral-950">
        {theme === 'dark' && (
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

      <header className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">VisualOS</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Operating Systems Visualizer</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setModule('cpu')}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                module === 'cpu'
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              CPU Scheduling
            </button>
            <button
              onClick={() => setModule('disk')}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                module === 'disk'
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Disk Scheduling
            </button>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
      </header>

      <main>{module === 'cpu' ? <CPUScheduling /> : <DiskScheduling />}</main>
    </div>
  )
}