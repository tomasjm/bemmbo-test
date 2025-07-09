import type { Batch } from "@/types";



export function InvoiceBatch({ batch }: { batch: Batch }) {
    return (
        <div>
            <p>Batch: {batch.id}</p>
            <p>Status: {batch.status}</p>
            <p>Invoices: {batch.invoices_ids.length}</p>
        </div>
    )
}