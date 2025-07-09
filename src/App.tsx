import { useEffect, useState } from "react";
import { InvoiceProgress } from "./components/invoices/invoice-progress";
import { InvoiceTableSkeleton } from "./components/ui/table-skeleton";
import { getInvoices } from "./lib/requests";
import useInvoiceStore from "./store/invoices.store";
import { InvoiceDataTable } from "./components/invoices/table/invoice-data-table";
import { columns } from "./components/invoices/table/invoice-table-columns";



function App() {
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { invoices, setInvoices, processing: { isProcessingInvoices, batchesInProgress } } = useInvoiceStore(state => state);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data || []);
      setIsLoading(false);
    }
    fetchInvoices();
  }, []);



  return (
      <div className="flex flex-col items-center justify-center h-screen w-full ">
        <h1 className="text-2xl font-bold">Tabla de facturas</h1>
        {
          isLoading ? <InvoiceTableSkeleton rows={5} /> : (
          <>
          <InvoiceProgress isProcessingInvoices={isProcessingInvoices} batchesInProgress={batchesInProgress} />
          <div className="container mx-auto flex flex-col gap-4l">
            <InvoiceDataTable columns={columns} data={invoices}/>
          </div>
          </>)
        }
      </div>
  );
}

export default App;
