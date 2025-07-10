import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import type { DataTableProps, Invoice } from "@/types";
import useInvoiceStore from "@/store/invoices.store";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { DataTableSelectedDisplay } from "@/components/ui/table-selected-display";
import DataTableBody from "@/components/ui/table-body";
import { useEffect, useState } from "react";
import React from "react";

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
    onRowSelectionChange: setInvoiceSelectionRows,
    state: {
      rowSelection: selectedRows,
    },
  });


  useEffect(() => {
    setSelectedInvoices(table.getSelectedRowModel().rows.map((row) => row.original as Invoice))
  }, [selectedRows])



  return (
    <div>
      <div className="flex justify-end my-4">
        <Button onClick={() => setIsConfirmDialogOpen(true)}>Inyectar facturas</Button>
      </div>
      <DataTableSelectedDisplay table={table} />
      <div className="rounded-md border overflow-hidden">
        <DataTableBody table={table} columns={columns} />
      </div>
      <div className="flex justify-center my-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
