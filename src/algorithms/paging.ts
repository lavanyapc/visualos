export interface PageTableEntry {
  pageNumber: number
  frameNumber: number | null // null means not currently loaded (page fault)
}

export interface PagingSetupResult {
  pageSize: number
  numFrames: number
  numPages: number
  pageTable: PageTableEntry[]
  frames: (number | null)[] // index = frame number, value = page number loaded there (or null if free)
}

export function setupPaging(processSize: number, pageSize: number, memorySize: number): PagingSetupResult {
  const numPages = Math.ceil(processSize / pageSize)
  const numFrames = Math.floor(memorySize / pageSize)

  const frames: (number | null)[] = new Array(numFrames).fill(null)
  const pageTable: PageTableEntry[] = []

  for (let page = 0; page < numPages; page++) {
    // Simple allocation: fill frames in order, one page per frame, until
    // physical memory runs out. Any pages beyond that point stay
    // unmapped (frameNumber: null) — this is what happens when a
    // process is genuinely larger than available physical memory.
    if (page < numFrames) {
      frames[page] = page
      pageTable.push({ pageNumber: page, frameNumber: page })
    } else {
      pageTable.push({ pageNumber: page, frameNumber: null })
    }
  }

  return { pageSize, numFrames, numPages, pageTable, frames }
}

export interface AddressTranslationResult {
  logicalAddress: number
  pageNumber: number
  offset: number
  frameNumber: number | null
  physicalAddress: number | null // null if page fault
  isPageFault: boolean
}

export function translateAddress(
  logicalAddress: number,
  pageSize: number,
  pageTable: PageTableEntry[],
): AddressTranslationResult {
  // Splitting a logical address into (page number, offset) is just
  // integer division and remainder against the page size.
  const pageNumber = Math.floor(logicalAddress / pageSize)
  const offset = logicalAddress % pageSize

  const entry = pageTable.find((e) => e.pageNumber === pageNumber)
  const frameNumber = entry ? entry.frameNumber : null

  const isPageFault = frameNumber === null
  const physicalAddress = isPageFault ? null : frameNumber * pageSize + offset

  return { logicalAddress, pageNumber, offset, frameNumber, physicalAddress, isPageFault }
}