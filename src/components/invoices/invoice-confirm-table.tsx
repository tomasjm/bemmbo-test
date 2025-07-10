import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
  import type { Invoice } from "@/types"


  
  
  export function InvoiceConfirmTable({ invoices }: { invoices: Invoice[] }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Emisor</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead className="text-right">Moneda</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.receiverName}</TableCell>
              <TableCell>{formatCurrency(invoice.amount, invoice.currency)}</TableCell>
              <TableCell className="text-right">{invoice.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    )
  }
  