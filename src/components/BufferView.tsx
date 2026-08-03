import { PCStep } from '../algorithms/producerConsumer'

interface Props {
  step: PCStep
}

export default function BufferView({ step }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {step.buffer.map((item, i) => (
          <div
            key={i}
            className={`w-14 h-14 rounded-lg border flex items-center justify-center text-sm font-semibold ${
              item !== null
                ? 'bg-amber-400 text-neutral-950 border-amber-400'
                : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600'
            }`}
          >
            {item !== null ? item : ''}
          </div>
        ))}
      </div>
      <div className="text-sm">
        {step.action.type === 'produce' && (
          <span className="text-green-600 dark:text-green-400 font-semibold">
            Producer added item {step.action.item}
          </span>
        )}
        {step.action.type === 'consume' && (
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            Consumer removed item {step.action.item}
          </span>
        )}
        {step.action.type === 'blocked-full' && (
          <span className="text-red-600 dark:text-red-400 font-semibold">Producer blocked — buffer full</span>
        )}
        {step.action.type === 'blocked-empty' && (
          <span className="text-red-600 dark:text-red-400 font-semibold">Consumer blocked — buffer empty</span>
        )}
      </div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        Produced: {step.producedCount} · Consumed: {step.consumedCount}
      </div>
    </div>
  )
}