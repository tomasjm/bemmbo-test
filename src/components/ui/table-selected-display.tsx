import type { Table } from "@tanstack/react-table"


interface DataTableSelectedDisplayProps<TData> {
  table: Table<TData>
}

export function DataTableSelectedDisplay<TData>({
  table,
}: DataTableSelectedDisplayProps<TData>) {
  return (
    <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} registros seleccionados.
      </div>
  )
}
