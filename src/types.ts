import type { ColumnDef } from "@tanstack/react-table"

export type Currency = "CLP" | "USD"

export type Invoice = {
    id: string
    receiverName: string
    amount: number
    currency: Currency
    injected?: boolean
  }

  export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

  export type Batch = {
    id: string
    invoices_ids: string[]
    status: "pending" | "in_progress" | "injected" | "failed" | "retrying"
  }

