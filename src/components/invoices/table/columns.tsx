import type { ColumnDef } from "@tanstack/react-table";
import type { Invoice } from "@/types";

export const columns: ColumnDef<Invoice>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
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
    }
]

