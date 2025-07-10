import type { Batch } from "@/types"

interface InvoiceProgressProps {
    isProcessingInvoices: boolean
    batchesInProgress: Batch[]
}


export function InvoiceProgress({ isProcessingInvoices, batchesInProgress }: InvoiceProgressProps) {
    const areBatchesInProgress = batchesInProgress.length > 0;

    if (!areBatchesInProgress) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <p>Processing invoices: {isProcessingInvoices ? "Yes" : "No"}</p>
            <p>Batches in progress: {batchesInProgress.length}</p>
            {batchesInProgress.map((batch) => (
                <div key={batch.id}>
                    <p>Batch {batch.id}: {batch.status}</p>
                    <p>Invoices: {batch.invoices.length}</p>
                </div>
            ))}
        </div>
    )
}