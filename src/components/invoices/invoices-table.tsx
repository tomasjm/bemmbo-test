import { getInvoices } from "@/lib/requests"
import { useQuery } from "@tanstack/react-query"
import { InvoiceDataTable } from "@/components/invoices/table/invoice-data-table"
import { columns } from "@/components/invoices/table/columns"


export function InvoicesTable() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["invoices"],
        queryFn: getInvoices,
    })
    
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    const data_qty = data.length;

    return (
        <div>
            <h1>Invoice Table</h1>
            <p>Total invoices: {data_qty}</p>
            <InvoiceDataTable columns={columns} data={data} />
        </div>
    )
}