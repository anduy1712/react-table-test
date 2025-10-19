export interface TableRowData {
  id: string
  [key: string]: any
}

export interface TableState {
  allRows: TableRowData[]
  displayedRows: TableRowData[]
  columns: string[]
  searchQuery: string
  isLoadingMore: boolean
  hasMore: boolean
  error: string | null
  currentBatchIndex: number
  initializeData: () => Promise<void>
  loadMore: () => void
  updateRow: (id: string, updatedRow: TableRowData) => void
  setSearchQuery: (query: string) => void
  exportData: () => void
}
