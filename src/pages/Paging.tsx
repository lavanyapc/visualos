import { useMemo, useState } from 'react'
import PagingSetupInput from '../components/PagingSetupInput'
import PageTableView from '../components/PageTableView'
import FrameGrid from '../components/FrameGrid'
import AddressTranslator from '../components/AddressTranslator'
import ExportPDFButton from '../components/ExportPDFButton'
import { setupPaging, translateAddress, AddressTranslationResult } from '../algorithms/paging'

export default function Paging() {
  const [processSize, setProcessSize] = useState(10000)
  const [pageSize, setPageSize] = useState(1000)
  const [memorySize, setMemorySize] = useState(6000)
  const [lastTranslation, setLastTranslation] = useState<AddressTranslationResult | null>(null)

  const setup = useMemo(
    () => setupPaging(processSize, pageSize, memorySize),
    [processSize, pageSize, memorySize],
  )

  const handleTranslate = (logicalAddress: number) => {
    const result = translateAddress(logicalAddress, pageSize, setup.pageTable)
    setLastTranslation(result)
    return result
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-lg font-semibold">Paging</h1>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Setup</h2>
        <PagingSetupInput
          processSize={processSize}
          onProcessSizeChange={setProcessSize}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          memorySize={memorySize}
          onMemorySizeChange={setMemorySize}
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
          {setup.numPages} pages needed, {setup.numFrames} frames available.
        </p>
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          Address Translation
        </h2>
        <AddressTranslator onTranslate={handleTranslate} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          Physical Memory (Frames)
        </h2>
        <FrameGrid frames={setup.frames} highlightFrame={lastTranslation?.frameNumber ?? null} />
      </section>

      <section>
        <h2 className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">Page Table</h2>
        <PageTableView pageTable={setup.pageTable} highlightPage={lastTranslation?.pageNumber ?? null} />
      </section>

      <div className="pt-4 flex justify-end">
        <ExportPDFButton />
      </div>
    </div>
  )
}