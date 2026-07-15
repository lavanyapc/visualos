import MagicBento from '../components/MagicBento'

interface Props {
  onStart: () => void
}

export default function Welcome({ onStart }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] rounded-full bg-amber-500/40 blur-[130px] animate-[float-a_18s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-violet-500/35 blur-[130px] animate-[float-b_22s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-100px] left-1/3 w-[450px] h-[450px] rounded-full bg-amber-400/30 blur-[140px] animate-[float-c_20s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[150px]" />
      </div>

      {/* Faint grain texture over the glow, so the gradients don't look
          like a flat digital wash — reads closer to a designed hero image. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative flex flex-col items-center justify-center px-6 py-20 text-center gap-14">
        <div>
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-amber-100 to-neutral-400 bg-clip-text text-transparent">
            Welcome to VisualOS
          </h1>
          <p className="text-neutral-400 mt-4 max-w-md mx-auto text-lg">
            Ready to learn Operating Systems by experimenting?
          </p>
          <button
            onClick={onStart}
            className="mt-9 px-8 py-3.5 rounded-full text-base bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 shadow-[0_0_30px_rgba(242,184,75,0.35)] hover:shadow-[0_0_50px_rgba(242,184,75,0.55)] transition-all hover:scale-105"
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
    </div>
  )
}