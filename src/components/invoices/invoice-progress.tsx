import type { Batch } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { InvoiceBatch } from "./invoice-batch"

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
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isProcessingInvoices && <Spinner size="sm" />}
                    Invoice Processing Status
                </CardTitle>
                <CardDescription>
                    {isProcessingInvoices ? "Procesando facturas..." : "Todas las facturas procesadas"}
                </CardDescription>
            </CardHeader>
            <CardContent>
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

                    <div className="space-y-3">
                        {batchesInProgress.map((batch) => (
                           <InvoiceBatch key={batch.id} batch={batch} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}