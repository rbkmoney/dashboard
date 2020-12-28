import { InvoiceCart } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoiceLine } from './generate-mock-invoice-line';

export function generateMockInvoiceCart(count: number): InvoiceCart {
    return new Array(count).fill(generateMockInvoiceLine());
}
