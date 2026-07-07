export default function ExportPDFButton() {
  const handleExport = () => {
    const root = document.documentElement
    const wasDark = root.classList.contains('dark')
    if (wasDark) root.classList.remove('dark')

    const restoreTheme = () => {
      if (wasDark) root.classList.add('dark')
      window.removeEventListener('afterprint', restoreTheme)
    }
    window.addEventListener('afterprint', restoreTheme)

    // Small delay so the browser actually repaints in light mode
    // before the print dialog opens.
    setTimeout(() => window.print(), 50)
  }

  return (
    <button
      onClick={handleExport}
      className="no-print px-4 py-2 rounded-md text-sm bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 transition-colors"
    >
      Export as PDF
    </button>
  )
}