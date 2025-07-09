import { Skeleton } from "./skeleton"

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="border-b">
        <div className="grid grid-cols-5 gap-4 p-4">
          <Skeleton className="h-4 w-4" /> {/* Checkbox column */}
          <Skeleton className="h-4 w-20" /> {/* Emisor */}
          <Skeleton className="h-4 w-16" /> {/* Monto */}
          <Skeleton className="h-4 w-16" /> {/* Moneda */}
          <Skeleton className="h-4 w-20" /> {/* Inyectado */}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4">
            <Skeleton className="h-4 w-4" /> {/* Checkbox */}
            <Skeleton className="h-4 w-24" /> {/* Emisor */}
            <Skeleton className="h-4 w-20" /> {/* Monto */}
            <Skeleton className="h-4 w-12" /> {/* Moneda */}
            <Skeleton className="h-4 w-4" /> {/* Inyectado (icon) */}
          </div>
        ))}
      </div>
    </div>
  )
}

// Alternative version that looks more like shadcn/ui table
export function InvoiceTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      {/* Header */}
      <div className="border-b bg-muted/50">
        <div className="grid grid-cols-5 gap-4 p-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="divide-y">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 