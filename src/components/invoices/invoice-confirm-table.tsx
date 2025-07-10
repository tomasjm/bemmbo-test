import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency } from "@/lib/utils"
import type { Invoice } from "@/types"

interface InvoiceConfirmTableProps {
  invoices: Invoice[]
}

export function InvoiceConfirmTable({ invoices }: InvoiceConfirmTableProps) {
  return (
    <ScrollArea maxHeight="400px" className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Emisor</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead >Moneda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.receiverName}</TableCell>
              <TableCell>{formatCurrency(invoice.amount, invoice.currency)}</TableCell>
              <TableCell >{invoice.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
  