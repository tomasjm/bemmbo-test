import type { Invoice } from "@/types";

const token = import.meta.env.VITE_BEMMBO_TOKEN;
const baseUrl = import.meta.env.VITE_BEMMBO_API_URL;




export async function getInvoices(): Promise<Invoice[]> {
    const response = await fetch(`${baseUrl}/invoices`, {
        headers: {
            "Authorization": `${token}`,
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch invoices");
    }
    const data = await response.json();
    return data;
}

