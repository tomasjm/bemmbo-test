import { useEffect, useState } from "react";
import { InvoiceProgress } from "./components/invoices/invoice-progress";
import { InvoiceTableSkeleton } from "./components/ui/table-skeleton";
import { getInvoices } from "./lib/requests";
import useInvoiceStore from "./store/invoices.store";
import { InvoiceDataTable } from "./components/invoices/table/invoice-data-table";
import { columns } from "./components/invoices/table/invoice-table-columns";
import { InvoiceConfirmDialog } from "./components/invoices/invoice-confirm-dialog";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    invoices,
    setInvoices,
    processing: { isProcessingInvoices, batchesInProgress },
    selectedInvoices,
    dialog: { isConfirmDialogOpen, setIsConfirmDialogOpen },
  } = useInvoiceStore((state) => state);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data || []);
      setIsLoading(false);
    };
    fetchInvoices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full my-10">
      <div className="container mx-auto flex flex-col gap-4 h-full ">
        <h1 className="text-2xl font-bold text-center">Tabla de facturas</h1>
        {isLoading ? (
          <InvoiceTableSkeleton rows={5} />
        ) : (
          <>
            <div className="flex flex-col gap-4 w-full">
              <InvoiceProgress
                isProcessingInvoices={isProcessingInvoices}
                batchesInProgress={batchesInProgress}
              />
            </div>
            <div className="container mx-auto flex flex-col gap-4l h-full">
              <InvoiceDataTable columns={columns} data={invoices} />
            </div>
          </>
        )}
        <InvoiceConfirmDialog
          invoices={selectedInvoices}
          isOpen={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        />
      </div>
    </div>
  );
}

export default App;
