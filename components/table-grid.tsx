"use client"

import { useEffect, useRef } from "react"
import { useTableStore } from "@/lib/store"
import { TableRow } from "./table-row"
import { LoadingSpinner } from "./loading-spinner"

export function TableGrid() {
  const { displayedRows, isLoadingMore, hasMore, loadMore, columns } = useTableStore()

  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, loadMore])

  if (displayedRows.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No data loaded. Click "Load Data" to begin.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="inline-block min-w-full">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 border-b">
          <div className="flex">
            <div className="w-12 px-4 py-3 text-xs font-semibold text-gray-600 border-r bg-gray-50">#</div>
            {columns.map((col) => (
              <div
                key={col}
                className="flex-1 min-w-[150px] px-4 py-3 text-xs font-semibold text-gray-600 border-r truncate"
              >
                {col}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div>
          {displayedRows.map((row, index) => (
            <TableRow key={row.id} row={row} index={index} />
          ))}
        </div>

        {/* Infinite scroll trigger */}
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          {isLoadingMore && <LoadingSpinner />}
          {!hasMore && displayedRows.length > 0 && <p className="text-sm text-gray-500">No more rows to load</p>}
        </div>
      </div>
    </div>
  )
}
