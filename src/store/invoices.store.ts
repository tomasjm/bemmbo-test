import type { Invoice } from '@/types';
import { create } from 'zustand'
import { processBatchWithRetry } from "@/lib/requests"



interface InvoiceStore {
  table: {
    selectedRows: {
      [key: string]: boolean
    };
    // por si hay dudas, esto sale del tipado de tanstack table y React.setState https://tanstack.com/table/latest/docs/framework/react/guide/table-state#on-state-change-callbacks

    setInvoiceSelectionRows: (invoiceSelectionRows: {
      [key: string]: boolean
    } | ((old: { [key: string]: boolean }) => { [key: string]: boolean })) => void;
  }

  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;

  processing: {
    isProcessingInvoices: boolean;
    batchesInProgress: number;
    setBatchesInProgress: (batchesInProgress: number) => void;
    clearOneBatch: () => void;
    updateCurrentInvoices: (invoices: string[]) => void;
    markInvoicesAsInjected: (invoices: Invoice[]) => Promise<boolean>;
  }
}


const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  table: {
    selectedRows: {},
    setInvoiceSelectionRows: (invoiceSelectionRows: {
      [key: string]: boolean
    } | ((old: { [key: string]: boolean }) => { [key: string]: boolean })) => {
      if (typeof invoiceSelectionRows === 'function') {
        set((state) => ({ 
          table: {
            ...state.table,
            selectedRows: invoiceSelectionRows(state.table.selectedRows)
          }
        }));
      } else {
        set((state) => ({ 
          table: {
            ...state.table,
            selectedRows: invoiceSelectionRows
          }
        }));
      }
    },
  },
  
  invoices: [],
  setInvoices: (invoices: Invoice[]) => set({ invoices: invoices }),

  processing: {
    isProcessingInvoices: false,
    batchesInProgress: 0,
    setBatchesInProgress: (batchesInProgress: number) => set((state) => ({ 
      processing: {
        ...state.processing,
        batchesInProgress: batchesInProgress
      }
    })),
    clearOneBatch: () => set((state) => ({ 
      processing: {
        ...state.processing,
        batchesInProgress: state.processing.batchesInProgress - 1
      }
    })),
    updateCurrentInvoices: (invoices_id: string[]) => {
      const currentInvoices = get().invoices;
      const newInvoiceState = currentInvoices.map((invoice) => {
        if (invoices_id.some((id) => id === invoice.id)) {
          return { ...invoice, injected: true };
        }
        return invoice;
      });
      set({ invoices: newInvoiceState });
    },
    
    markInvoicesAsInjected: async (selectedInvoices: Invoice[]): Promise<boolean> => {
      set((state) => ({ 
        processing: {
          ...state.processing,
          isProcessingInvoices: true
        }
      }));
      
      if (selectedInvoices.length === 0) {
        set((state) => ({ 
          processing: {
            ...state.processing,
            isProcessingInvoices: false
          }
        }));
        return false;
      }
    
      const batches: Invoice[][] = [];
      for (let i = 0; i < selectedInvoices.length; i += 25) {
        batches.push(selectedInvoices.slice(i, i + 25));
      }
      
      set((state) => ({ 
        processing: {
          ...state.processing,
          batchesInProgress: batches.length
        }
      }));
      try {
        // secuencial, si no usaria Promise.all
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          console.log(`Processing batch ${i + 1}/${batches.length} with ${batch.length} invoices`);
          const result = await processBatchWithRetry(batch, 5);
          get().processing.clearOneBatch();
          get().processing.updateCurrentInvoices(result);
        }
        
        alert(`Successfully injected ${selectedInvoices.length} invoices in ${batches.length} batch(es)`);
        set((state) => ({ 
          processing: {
            ...state.processing,
            isProcessingInvoices: false
          }
        }));
        return true;
      } catch (error) {
        console.error("Error injecting invoices:", error);
        alert(`Failed to inject invoices: ${error instanceof Error ? error.message : 'Unknown error'}`);
        set((state) => ({ 
          processing: {
            ...state.processing,
            isProcessingInvoices: false
          }
        }));
        return false;
      }
    },
  }
}))

export default useInvoiceStore;
