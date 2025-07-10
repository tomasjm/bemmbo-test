import type { Batch, BatchStatus, Invoice } from "@/types";
import { create } from "zustand";
import { injectInvoices } from "@/lib/requests";

interface InvoiceStore {
  table: {
    selectedRows: {
      [key: string]: boolean;
    };
    // por si hay dudas, esto sale del tipado de tanstack table y React.setState https://tanstack.com/table/latest/docs/framework/react/guide/table-state#on-state-change-callbacks

    setInvoiceSelectionRows: (
      invoiceSelectionRows:
        | {
            [key: string]: boolean;
          }
        | ((old: { [key: string]: boolean }) => { [key: string]: boolean })
    ) => void;
    clearSelectedRows: () => void;
  };
  dialog: {
    isConfirmDialogOpen: boolean;
    setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) => void;
  };
  invoices: Invoice[];
  selectedInvoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
  setSelectedInvoices: (invoices: Invoice[]) => void;

  processing: {
    isProcessingInvoices: boolean;
    batchesInProgress: Batch[];
    setBatchesInProgress: (batchesInProgress: Batch[]) => void;
    clearBatch: (batch_id: string) => void;
    updateBatchStatus: (batch_id: string, status: BatchStatus) => void;
    updateCurrentInvoices: (invoices: string[]) => void;
    markInvoicesAsInjected: (invoices: Invoice[]) => Promise<boolean>;
  };
}

const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  dialog: {
    isConfirmDialogOpen: false,
    setIsConfirmDialogOpen: (isConfirmDialogOpen: boolean) =>
      set({
        dialog: { ...get().dialog, isConfirmDialogOpen: isConfirmDialogOpen },
      }),
  },
  table: {
    clearSelectedRows: () =>
      set((state) => ({ table: { ...state.table, selectedRows: {} } })),
    selectedRows: {},
    setInvoiceSelectionRows: (
      invoiceSelectionRows:
        | {
            [key: string]: boolean;
          }
        | ((old: { [key: string]: boolean }) => { [key: string]: boolean })
    ) => {
      if (typeof invoiceSelectionRows === "function") {
        set((state) => ({
          table: {
            ...state.table,
            selectedRows: invoiceSelectionRows(state.table.selectedRows),
          },
        }));
      } else {
        set((state) => ({
          table: {
            ...state.table,
            selectedRows: invoiceSelectionRows,
          },
        }));
      }
    },
  },
  selectedInvoices: [],
  setSelectedInvoices: (invoices: Invoice[]) =>
    set({ selectedInvoices: invoices }),
  invoices: [],
  setInvoices: (invoices: Invoice[]) => set({ invoices: invoices }),

  processing: {
    isProcessingInvoices: false,
    batchesInProgress: [],
    updateBatchStatus: (batch_id: string, status: BatchStatus) =>
      set((state) => ({
        processing: {
          ...state.processing,
          batchesInProgress: state.processing.batchesInProgress.map((b) =>
            b.id === batch_id ? { ...b, status } : b
          ),
        },
      })),
    setBatchesInProgress: (batchesInProgress: Batch[]) =>
      set((state) => ({
        processing: {
          ...state.processing,
          batchesInProgress: batchesInProgress,
        },
      })),
    clearBatch: (batch_id: string) =>
      set((state) => ({
        processing: {
          ...state.processing,
          batchesInProgress: state.processing.batchesInProgress.filter(
            (b) => b.id !== batch_id
          ),
        },
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

    markInvoicesAsInjected: async (
      selectedInvoices: Invoice[]
    ): Promise<boolean> => {
      set((state) => ({
        processing: {
          ...state.processing,
          isProcessingInvoices: true,
        },
      }));

      if (selectedInvoices.length === 0) {
        set((state) => ({
          processing: {
            ...state.processing,
            isProcessingInvoices: false,
          },
        }));
        return false;
      }

      const batches: Invoice[][] = [];
      for (let i = 0; i < selectedInvoices.length; i += 25) {
        batches.push(selectedInvoices.slice(i, i + 25));
      }

      const batchesInProgress = batches.map((batch, index) => ({
        id: index.toString(),
        invoices: batch,
        status: "pending",
      })) as Batch[];

      set((state) => ({
        processing: {
          ...state.processing,
          batchesInProgress: batchesInProgress,
        },
      }));
      try {
        // secuencial, si no usaria Promise.all
        for (const batch of batchesInProgress) {
          console.log(
            `Processing batch ${batch.id} with ${batch.invoices.length} invoices`
          );
          get().processing.updateBatchStatus(batch.id, "in_progress");

          for (let attempt = 0; attempt <= 5; attempt++) {
            const [error, validInvoiceIds] = await injectInvoices(
              batch.invoices
            );

            if (error) {
              if (attempt < 5) {
                const delay = Math.pow(2, attempt) * 1000;
                console.log(
                  `Some batch failed with 500 error, retrying in ${delay}ms... (attempt ${
                    attempt + 1
                  }/5)`
                );
                await new Promise((resolve) => setTimeout(resolve, delay));
                get().processing.updateBatchStatus(batch.id, "retrying");
                continue;
              } else {
                get().processing.updateBatchStatus(batch.id, "failed");
                break;
              }
            }
            get().processing.updateBatchStatus(batch.id, "injected");
            get().processing.updateCurrentInvoices(validInvoiceIds);
            setTimeout(() => {
              get().processing.clearBatch(batch.id.toString());
              
            }, 5000);
            
            break;
          }
        }

        get().table.clearSelectedRows();

        set((state) => ({
          processing: {
            ...state.processing,
            isProcessingInvoices: false,
          },
        }));
        return true;
      } catch (error) {
        console.error("Error injecting invoices:", error);
      
        set((state) => ({
          processing: {
            ...state.processing,
            isProcessingInvoices: false,
          },
        }));
        return false;
      }
    },
  },
}));

export default useInvoiceStore;
