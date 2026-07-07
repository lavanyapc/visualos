import MagicBento from '../components/MagicBento'

interface Props {
  onStart: () => void
}

export default function Welcome({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center gap-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to VisualOS</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-3 max-w-md mx-auto">
          Ready to learn Operating Systems by experimenting?
        </p>
        <button
          onClick={onStart}
          className="mt-8 px-6 py-3 rounded-md text-base bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          Ready to Learn
        </button>
      </div>

      <div className="flex justify-center w-full">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={10}
          glowColor="242, 184, 75"
        />
      </div>
    </div>
  )
}