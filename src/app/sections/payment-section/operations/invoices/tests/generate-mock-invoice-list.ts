import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoice } from './generate-mock-invoice';

export function generateMockInvoiceList(count: number, offset = 0): Invoice[] {
    const cart: Invoice[] = [];
    for (let i = offset; i < count + offset; i += 1) {
        cart.push(generateMockInvoice(i));
    }
    return cart;
}
