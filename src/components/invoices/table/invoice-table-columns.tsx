import type { ColumnDef } from "@tanstack/react-table";
import type { Currency, Invoice } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          (() => {
            const pageRows = table.getRowModel().rows;
            const nonInjectedRows = pageRows.filter(row => !row.original.injected);
            
            if (nonInjectedRows.length === 0) return false;
            // tenemos que calcular el total de filas de la pagina seleccionadas y que sean posible de seleccionar
            const selectedNonInjectedRows = nonInjectedRows.filter(row => row.getIsSelected());
            const allNonInjectedSelected = selectedNonInjectedRows.length === nonInjectedRows.length;
            const someNonInjectedSelected = selectedNonInjectedRows.length > 0;
            
            return allNonInjectedSelected || (someNonInjectedSelected && "indeterminate");
          })()
        }
                  onCheckedChange={(value) => {
            const pageRows = table.getRowModel().rows;
            const nonInjectedRows = pageRows.filter(row => !row.original.injected);
            nonInjectedRows.forEach(row => row.toggleSelected(!!value));
          }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value ? !row.original.injected : false)}
        aria-label="Select row"
        disabled={row.original.injected}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Emisor",
    accessorKey: "receiverName",
  },
  {
    header: "Monto",
    accessorKey: "amount",

    cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const currency = row.getValue("currency") as Currency;
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{formatCurrency(amount,currency)}</span>
            </div>
        )
      },
  },
  {
    header: "Moneda",
    accessorKey: "currency",
    cell: ({ row }) => {
        const currency = row.getValue("currency") as Currency;
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{currency}</span>
            </div>
        )
      },
  },
  {
    header: "Inyectado",
    accessorKey: "injected",
    cell: ({ row }) => {
      const injected = row.getValue("injected") as boolean | undefined;
      return injected ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-red-600" />
      );
    },
  },
];
