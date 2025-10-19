"use client"

import { useState, useCallback } from "react"
import { useTableStore } from "@/lib/store"
import { TableGrid } from "./table-grid"
import { TableToolbar } from "./table-toolbar"
import { LoadingSpinner } from "./loading-spinner"

export function TableEditor() {
  const [isLoading, setIsLoading] = useState(false)
  const { initializeData, error } = useTableStore()

  const handleLoadData = useCallback(async () => {
    setIsLoading(true)
    try {
      await initializeData()
    } finally {
      setIsLoading(false)
    }
  }, [initializeData])

  return (
    <div className="flex flex-col h-screen">
      <TableToolbar onLoadData={handleLoadData} isLoading={isLoading} />

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 m-4 rounded">{error}</div>}

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <TableGrid />
      )}
    </div>
  )
}
