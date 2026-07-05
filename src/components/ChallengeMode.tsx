import { useState } from 'react'

interface Props {
  onSubmit: (guess: number) => void
}

export default function ChallengeMode({ onSubmit }: Props) {
  const [guess, setGuess] = useState('')

  const handleSubmit = () => {
    const parsed = Number(guess)
    if (!Number.isNaN(parsed) && guess.trim() !== '') {
      onSubmit(parsed)
    }
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-neutral-100 dark:bg-neutral-900 space-y-3">
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        Look at the processes and algorithm above. Before the Gantt chart and metrics are revealed,
        predict the <span className="text-amber-600 dark:text-amber-400 font-medium">average waiting time</span>.
      </p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          step="0.1"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="e.g. 3.5"
          className="w-28 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={guess.trim() === ''}
          className="px-3 py-1.5 rounded-md text-sm bg-amber-400 text-neutral-950 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit guess
        </button>
      </div>
    </div>
  )
}