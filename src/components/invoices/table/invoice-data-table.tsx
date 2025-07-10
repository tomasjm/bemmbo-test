import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import type { DataTableProps, Invoice } from "@/types";
import useInvoiceStore from "@/store/invoices.store";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableSelectedDisplay } from "@/components/ui/table-selected-display";
import DataTableBody from "@/components/ui/table-body";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Upload } from "lucide-react";

export function InvoiceDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {
    setSelectedInvoices,
    table: { selectedRows, setInvoiceSelectionRows },
    dialog: { setIsConfirmDialogOpen },
  } = useInvoiceStore((state) => state);



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setInvoiceSelectionRows,
    state: {
      rowSelection: selectedRows,
    },
  });


  useEffect(() => {
    setSelectedInvoices(table.getSelectedRowModel().rows.map((row) => row.original as Invoice))
  }, [selectedRows])



  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Buscar por emisor:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                placeholder="Buscar emisor..."
                value={(table.getColumn("receiverName")?.getFilterValue() as string) ?? ""}
                onChange={(event) => 
                  table.getColumn("receiverName")?.setFilterValue(event.target.value)
                }
                className="w-64 pl-3 pr-10"
              />
              {(table.getColumn("receiverName")?.getFilterValue() as string) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => table.getColumn("receiverName")?.setFilterValue("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.getColumn("receiverName")?.setFilterValue("")}
              className="px-3 text-muted-foreground hover:text-foreground"
              disabled={!(table.getColumn("receiverName")?.getFilterValue() as string)}
            >
              <X className="h-3 w-3 mr-1" />
              Limpiar
            </Button>
          </div>
        </div>
        <Button 
          onClick={() => setIsConfirmDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          size="sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          Inyectar facturas
        </Button>
      </div>

      {/* Selection Display */}
      <DataTableSelectedDisplay table={table} />

      {/* Table Container */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <DataTableBody table={table} columns={columns} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
