import { InvoiceCart } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoiceLine } from './generate-mock-invoice-line';

export function generateMockInvoiceCart(count: number): InvoiceCart {
    const cart: InvoiceCart = [];
    for (let i = 0; i < count; i += 1) {
        cart.push(generateMockInvoiceLine());
    }
    return cart;
}
