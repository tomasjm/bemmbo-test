import type { ColumnDef } from "@tanstack/react-table";
import type { Invoice } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";

export const columns: ColumnDef<Invoice>[] = [
    {
        header: "Emisor",
        accessorKey: "receiverName",
    },
    {
        header: "Monto",
        accessorKey: "amount",
    },
    {
        header: "Moneda",
        accessorKey: "currency",
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
    }
]

