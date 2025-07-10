import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import type { Invoice } from "@/types"
import { InvoiceConfirmTable } from "./invoice-confirm-table"
import { Button } from "../ui/button"
import useInvoiceStore from "@/store/invoices.store"

interface InvoiceConfirmDialogProps {
  invoices: Invoice[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

  export function InvoiceConfirmDialog({ invoices, isOpen, onOpenChange }: InvoiceConfirmDialogProps) {
    const {
      processing: { markInvoicesAsInjected },
    } = useInvoiceStore((state) => state);
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inyección de facturas</DialogTitle>
            <DialogDescription>
Revisa las facturas que se van a inyectar y confirma la inyección.
           </DialogDescription>
          </DialogHeader>
          <InvoiceConfirmTable invoices={invoices} />
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button onClick={() => {
              onOpenChange(false)
              markInvoicesAsInjected(invoices)
            }}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }