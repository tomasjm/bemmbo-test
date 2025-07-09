import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InvoicesTable } from "./components/invoices/invoices-table";


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center h-screen min-h-screen w-full ">
        <InvoicesTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
