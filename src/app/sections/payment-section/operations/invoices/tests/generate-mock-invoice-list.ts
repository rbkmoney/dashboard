import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoice } from './generate-mock-invoice';

export function generateMockInvoiceList(count: number, offset = 0): Invoice[] {
    return new Array(count).fill(null).map((_, i) => generateMockInvoice(`mock_invoice_${i + offset}`));
}
