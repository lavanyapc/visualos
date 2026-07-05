// Locked to the gold / purple / white theme instead of a rainbow palette,
// so process colors match the Galaxy background instead of clashing with it.
const PALETTE = [
  '#F2B84B', // gold
  '#A78BFA', // purple
  '#E5E5E5', // white / silver
  '#C9A227', // deep gold
  '#7C3AED', // deep purple
  '#F5F5F5', // bright white
]

export function colorForProcess(id: string, allIds: string[]): string {
  const index = allIds.indexOf(id)
  if (index === -1) return '#9ca3af'
  return PALETTE[index % PALETTE.length]
}