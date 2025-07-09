import type { Currency } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





export function formatCurrency(amount: number, currency: Currency) {
  if (currency === "CLP") {
    return "$" + amount.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  if (currency === "USD") {
    return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return amount.toString();
}

