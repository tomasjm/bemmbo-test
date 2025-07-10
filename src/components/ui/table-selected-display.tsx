import type { Table } from "@tanstack/react-table"
import { Button } from "./button"
import { Trash2 } from "lucide-react"


interface DataTableSelectedDisplayProps<TData> {
  table: Table<TData>
}

export function DataTableSelectedDisplay<TData>({
  table,
}: DataTableSelectedDisplayProps<TData>) {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} registros seleccionados.
      </div>
      <Button variant="outline" size="sm" onClick={() => table.resetRowSelection()}>
        <Trash2 className="w-4 h-4" />
        Limpiar seleccion
      </Button>
    </div>
  )
}
