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



export async function injectInvoices(invoices: Invoice[]): Promise<[error: boolean, validInvoiceIds: string[]]> {
    console.log(JSON.stringify(invoices.map((invoice) => invoice.id)));
    if (invoices.length === 0) {
        return [true, []];
    }
    if (invoices.length > 25) {
        return [true, []];
    }
    const response = await fetch(`${baseUrl}/invoices/inject`, {
        method: "POST",
        headers: {
            "Authorization": `${token}`,
        },
        body: JSON.stringify({ invoiceIds: invoices.map((invoice) => invoice.id) }),
    })
    if (!response.ok) {
        return [true, []];
    }
    const data = await response.json();
    return [false, data.validInvoiceIds];
}


export async function processBatchWithRetry(batch: Invoice[], maxRetries: number = 3): Promise<string[]>{ 
       
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const [error, validInvoiceIds] = await injectInvoices(batch);

        if (error) {
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 1000; 
                console.log(`Some batch failed with 500 error, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            } else {
                throw new Error("Failed to inject invoices");
            }
        }
        return validInvoiceIds;
    }
    return [];
  };
