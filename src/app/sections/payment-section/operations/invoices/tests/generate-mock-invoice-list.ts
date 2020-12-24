import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoice } from './generate-mock-invoice';

export function generateMockInvoiceList(count: number): Invoice[] {
    const cart: Invoice[] = [];
    for (let i = 0; i < count; i += 1) {
        cart.push(generateMockInvoice(i));
    }
    return cart;
}
