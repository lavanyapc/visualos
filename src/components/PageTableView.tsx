import { PageTableEntry } from '../algorithms/paging'

interface Props {
  pageTable: PageTableEntry[]
  highlightPage?: number | null
}

export default function PageTableView({ pageTable, highlightPage = null }: Props) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
          <tr>
            <th className="text-left px-3 py-2">Page Number</th>
            <th className="text-left px-3 py-2">Frame Number</th>
          </tr>
        </thead>
        <tbody>
          {pageTable.map((entry) => (
            <tr
              key={entry.pageNumber}
              className={`border-t border-neutral-200 dark:border-neutral-800 ${
                entry.pageNumber === highlightPage ? 'bg-amber-100 dark:bg-amber-950' : ''
              }`}
            >
              <td className="px-3 py-2">{entry.pageNumber}</td>
              <td className="px-3 py-2">
                {entry.frameNumber !== null ? (
                  entry.frameNumber
                ) : (
                  <span className="text-red-500 dark:text-red-400">not loaded</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}