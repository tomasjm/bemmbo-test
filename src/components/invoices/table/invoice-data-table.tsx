import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
  } from "@tanstack/react-table"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DataTableProps, Invoice } from "@/types"
import useInvoiceStore from "@/store/invoices.store"
import { DataTablePagination } from "@/components/ui/table-pagination"




  export function InvoiceDataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {


    const { table: { selectedRows, setInvoiceSelectionRows } } = useInvoiceStore(state => state);

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setInvoiceSelectionRows,
      state: {
        rowSelection: selectedRows,
      },
    })

    const { processing: { markInvoicesAsInjected } } = useInvoiceStore(state => state);

    async function injectInvoices() {
        const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original as Invoice);
        const success = await markInvoicesAsInjected(selectedRows);
        if (success) {
            table.resetRowSelection();
        }
    }

  
    return (
      <div>
        <div className="flex justify-end my-4">
          <Button onClick={injectInvoices}>Inject Invoices</Button>
        </div>
        <div className="rounded-md border overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    )
  }