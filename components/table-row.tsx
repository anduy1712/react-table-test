"use client"

import { useState } from "react"
import { useTableStore } from "@/lib/store"
import type { TableRowData } from "@/lib/types"
import { ChevronDown } from "lucide-react"

interface TableRowProps {
  row: TableRowData
  index: number
}

export function TableRow({ row, index }: TableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { columns, updateRow } = useTableStore()

  const handleCellChange = (column: string, value: string) => {
    updateRow(row.id, { ...row, [column]: value })
  }

  return (
    <>
      <div className="flex border-b hover:bg-blue-50 transition-colors">
        <div className="w-12 px-4 py-3 text-xs text-gray-500 border-r flex items-center justify-center">
          {index + 1}
        </div>

        {columns.map((col) => (
          <div key={`${row.id}-${col}`} className="flex-1 min-w-[150px] px-4 py-3 border-r">
            <input
              type="text"
              value={String(row[col] || "")}
              onChange={(e) => handleCellChange(col, e.target.value)}
              className="w-full bg-transparent text-sm outline-none focus:bg-white focus:px-2 focus:py-1 focus:rounded focus:border focus:border-blue-300"
              placeholder="-"
            />
          </div>
        ))}

        <div className="w-12 px-4 py-3 flex items-center justify-center">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 hover:bg-gray-200 rounded">
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-gray-50 border-b px-4 py-4">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {columns.map((col) => (
              <div key={`detail-${col}`}>
                <label className="text-xs font-semibold text-gray-600 block mb-1">{col}</label>
                <textarea
                  value={String(row[col] || "")}
                  onChange={(e) => handleCellChange(col, e.target.value)}
                  className="w-full text-sm border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
