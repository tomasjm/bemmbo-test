import type { Batch } from "@/types"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { InvoiceBatch } from "@/components/invoices/invoice-batch"

interface InvoiceProgressProps {
    isProcessingInvoices: boolean
    batchesInProgress: Batch[]
}


export function InvoiceProgress({ 
    isProcessingInvoices, 
    batchesInProgress 
}: InvoiceProgressProps) {
    const isOpen = isProcessingInvoices || batchesInProgress.length > 0;

    return (
        <Dialog open={isOpen} >
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] [&>button:last-child]:hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isProcessingInvoices && <Spinner size="sm" />}
                        Estado de procesamiento
                    </DialogTitle>
                    <DialogDescription>
                        {isProcessingInvoices ? "Procesando facturas..." : "Todas las facturas procesadas"}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Estado de procesamiento:</span>
                        <Badge variant={isProcessingInvoices ? "default" : "secondary"}>
                            {isProcessingInvoices ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Batches en progreso:</span>
                        <Badge variant="outline">{batchesInProgress.length}</Badge>
                    </div>

                    {batchesInProgress.length > 0 && (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {batchesInProgress.map((batch) => (
                                <InvoiceBatch key={batch.id} batch={batch} />
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}