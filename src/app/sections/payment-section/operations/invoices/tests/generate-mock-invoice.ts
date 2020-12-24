import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoiceCart } from './generate-mock-invoice-cart';

export function generateMockInvoice(order: number, status: Invoice.StatusEnum = Invoice.StatusEnum.Paid): Invoice {
    return {
        id: `mock_invoice_${order}`,
        shopID: 'testShopID',
        createdAt: new Date(),
        dueDate: new Date(),
        amount: 100,
        currency: 'RUB',
        product: 'Test product',
        cart: generateMockInvoiceCart(5),
        status,
        metadata: {},
    };
}
