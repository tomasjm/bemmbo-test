import { flexRender, type ColumnDef, type Table as TableType } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableRow  } from "@/components/ui/table";
import DataTableHeader from "@/components/ui/table-header";

interface DataTableBodyProps<TData> {

    table: TableType<TData>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<TData, any>[]
  }
  
  export default function DataTableBody<TData>({
    table,
    columns,
  }: DataTableBodyProps<TData>) {
    return (
        <Table className="w-full">
          <DataTableHeader table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    )
  }