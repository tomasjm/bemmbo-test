import type { Batch } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

interface InvoiceProgressProps {
    isProcessingInvoices: boolean
    batchesInProgress: Batch[]
}

function getStatusBadgeVariant(status: string) {
    switch (status.toLowerCase()) {
        case 'processing':
        case 'in-progress':
            return 'default'
        case 'completed':
        case 'success':
            return 'secondary'
        case 'failed':
        case 'error':
            return 'destructive'
        default:
            return 'outline'
    }
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
                    {isProcessingInvoices ? "Processing invoices..." : "All invoices processed"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Processing Status:</span>
                        <Badge variant={isProcessingInvoices ? "default" : "secondary"}>
                            {isProcessingInvoices ? "Active" : "Idle"}
                        </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Batches in Progress:</span>
                        <Badge variant="outline">{batchesInProgress.length}</Badge>
                    </div>

                    <div className="space-y-3">
                        {batchesInProgress.map((batch) => (
                            <div 
                                key={batch.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-sm">Batch {batch.id}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {batch.invoices.length} invoices
                                    </span>
                                </div>
                                <Badge variant={getStatusBadgeVariant(batch.status)}>
                                    {batch.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}