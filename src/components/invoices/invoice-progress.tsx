



export function InvoiceProgress({ isProcessingInvoices, batchesInProgress }: { isProcessingInvoices: boolean, batchesInProgress: number }) {
    return (
        <div>
            <p>Processing invoices: {isProcessingInvoices ? "Yes" : "No"}</p>
            <p>Batches in progress: {batchesInProgress}</p>
        </div>
    )
}