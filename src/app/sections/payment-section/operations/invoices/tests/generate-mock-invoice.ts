import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockInvoiceCart } from './generate-mock-invoice-cart';

export function generateMockInvoice(id: string, status: Invoice.StatusEnum = Invoice.StatusEnum.Paid): Invoice {
    return {
        id,
        shopID: 'testShopID',
        createdAt: new Date(10000000),
        dueDate: new Date(10000000),
        amount: 100,
        currency: 'RUB',
        product: 'Test product',
        cart: generateMockInvoiceCart(5),
        status,
        metadata: {},
    };
}
