import { useState } from 'react'
import { AddressTranslationResult } from '../algorithms/paging'

interface Props {
  onTranslate: (logicalAddress: number) => AddressTranslationResult
}

export default function AddressTranslator({ onTranslate }: Props) {
  const [input, setInput] = useState('4500')
  const [result, setResult] = useState<AddressTranslationResult | null>(null)

  const handleTranslate = () => {
    const parsed = Number(input)
    if (!Number.isNaN(parsed) && input.trim() !== '') {
      setResult(onTranslate(parsed))
    }
  }

  const inputClass =
    'w-32 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded px-2 py-1 text-sm'

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-neutral-100 dark:bg-neutral-900 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Logical address</span>
          <input
            type="number"
            min={0}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={inputClass}
          />
        </label>
        <button
          onClick={handleTranslate}
          className="px-3 py-1.5 rounded-md text-sm bg-amber-400 text-neutral-950 font-semibold hover:bg-amber-300 transition-colors"
        >
          Translate
        </button>
      </div>

      {result && (
        <div className="text-sm space-y-1 font-mono pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-neutral-600 dark:text-neutral-400">
            Page Number = {result.logicalAddress} / pageSize = {result.pageNumber}
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            Offset = {result.logicalAddress} % pageSize = {result.offset}
          </div>
          {result.isPageFault ? (
            <div className="text-red-500 dark:text-red-400 font-semibold">
              Page Fault — page {result.pageNumber} is not currently loaded in any frame.
            </div>
          ) : (
            <div className="text-amber-600 dark:text-amber-400 font-semibold">
              Physical Address = (Frame {result.frameNumber} x pageSize) + Offset = {result.physicalAddress}
            </div>
          )}
        </div>
      )}
    </div>
  )
}