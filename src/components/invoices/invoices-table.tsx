import { getInvoices } from "@/lib/requests"
import { useQuery } from "@tanstack/react-query"
import { InvoiceDataTable } from "@/components/invoices/table/invoice-data-table"
import { columns } from "@/components/invoices/table/invoice-table-columns"
import { useEffect } from "react"
import useInvoiceStore from "@/store/invoices.store"


export function InvoicesTable() {
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["invoices"],
        queryFn: getInvoices,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        gcTime: Infinity,
    })
    const { invoices, setInvoices, processing: { isProcessingInvoices, batchesInProgress } } = useInvoiceStore(state => state);

    useEffect(() => {
        setInvoices(data || []);
    }, [data]);
    
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    const data_qty = data.length;

   


    return (
        <div className="container mx-auto flex flex-col gap-4 "
        >
            <h1>Invoice Table</h1>
            <p>Total invoices: {data_qty}</p>

            {isProcessingInvoices && <p>Processing invoices... {batchesInProgress}</p>}

            <InvoiceDataTable columns={columns} data={invoices} />
        </div>
    )
}