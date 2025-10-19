"use client"

import { useTableStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download } from "lucide-react"

interface TableToolbarProps {
  onLoadData: () => Promise<void>
  isLoading: boolean
}

export function TableToolbar({ onLoadData, isLoading }: TableToolbarProps) {
  const { searchQuery, setSearchQuery, exportData } = useTableStore()

  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex-1 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search rows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onLoadData} disabled={isLoading} variant="default">
            {isLoading ? "Loading..." : "Load Data"}
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}
