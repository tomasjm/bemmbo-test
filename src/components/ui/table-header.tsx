import { flexRender, type Table } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTablePaginationProps<TData> {

    table: Table<TData>
  }
  
  export default function DataTableHeader<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
        <TableHeader className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
    )
  }