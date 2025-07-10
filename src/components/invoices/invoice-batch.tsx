import type { Batch } from "@/types";
import { Badge } from "@/components/ui/badge";

function getStatusBadgeVariant(status: string) {
    console.log(status);
  switch (status.toLowerCase()) {
    case "pending":
      return "default";
    case "in_progress":
      return "progress";
    case "injected":
      return "success";
    case "failed":
      return "destructive";
    case "retrying":
      return "warning";
    default:
      return "outline";
  }
}

function getStatusText(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pendiente";
    case "in_progress":
      return "En progreso";
    case "injected":
      return "Inyectado";
    case "failed":
      return "Fallo";
    case "retrying":
      return "Reintentando";
    default:
      return "Desconocido";
  }
}

export function InvoiceBatch({ batch }: { batch: Batch }) {
  return (
    <div
      key={batch.id}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium text-sm">Batch {batch.id}</span>
        <span className="text-xs text-muted-foreground">
          {batch.invoices.length} facturas
        </span>
      </div>
      <Badge variant={getStatusBadgeVariant(batch.status)}>
        {getStatusText(batch.status)}
      </Badge>
    </div>
  );
}
