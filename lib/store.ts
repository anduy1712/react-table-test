import { create } from "zustand"
import type { TableRowData, TableState } from "./types"
import { fetchJsonData } from "./data-fetcher"

const BATCH_SIZE = 50

export const useTableStore = create<TableState>((set, get) => ({
  allRows: [],
  displayedRows: [],
  columns: [],
  searchQuery: "",
  isLoadingMore: false,
  hasMore: true,
  error: null,
  currentBatchIndex: 0,

  initializeData: async () => {
    try {
      set({ error: null })
      const data = await fetchJsonData()

      if (!Array.isArray(data)) {
        throw new Error("Data must be an array")
      }

      // Extract columns from first row
      const columns = data.length > 0 ? Object.keys(data[0]) : []

      // Add unique IDs if not present
      const rowsWithIds: TableRowData[] = data.map((row, idx) => ({
        ...row,
        id: row.id || `row-${idx}`,
      }))

      set({
        allRows: rowsWithIds,
        columns,
        currentBatchIndex: 0,
        hasMore: rowsWithIds.length > BATCH_SIZE,
        displayedRows: rowsWithIds.slice(0, BATCH_SIZE),
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data"
      set({ error: errorMessage })
    }
  },

  loadMore: () => {
    const { allRows, currentBatchIndex, displayedRows } = get()
    const nextIndex = currentBatchIndex + 1
    const startIdx = nextIndex * BATCH_SIZE
    const endIdx = startIdx + BATCH_SIZE

    if (startIdx >= allRows.length) {
      set({ hasMore: false })
      return
    }

    const newRows = allRows.slice(startIdx, endIdx)
    set({
      displayedRows: [...displayedRows, ...newRows],
      currentBatchIndex: nextIndex,
      hasMore: endIdx < allRows.length,
    })
  },

  updateRow: (id: string, updatedRow: TableRowData) => {
    const { allRows, displayedRows } = get()

    const updatedAllRows = allRows.map((row) => (row.id === id ? updatedRow : row))

    const updatedDisplayedRows = displayedRows.map((row) => (row.id === id ? updatedRow : row))

    set({
      allRows: updatedAllRows,
      displayedRows: updatedDisplayedRows,
    })
  },

  setSearchQuery: (query: string) => {
    const { allRows, columns } = get()

    set({ searchQuery: query })

    if (!query.trim()) {
      set({
        displayedRows: allRows.slice(0, BATCH_SIZE),
        currentBatchIndex: 0,
        hasMore: allRows.length > BATCH_SIZE,
      })
      return
    }

    const filtered = allRows.filter((row) =>
      columns.some((col) =>
        String(row[col] || "")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    )

    set({
      displayedRows: filtered.slice(0, BATCH_SIZE),
      currentBatchIndex: 0,
      hasMore: filtered.length > BATCH_SIZE,
    })
  },

  exportData: () => {
    const { displayedRows, columns } = get()

    const csv = [
      columns.join(","),
      ...displayedRows.map((row) =>
        columns
          .map((col) => {
            const value = String(row[col] || "")
            return value.includes(",") ? `"${value}"` : value
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `table-export-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  },
}))
