import { InvoiceLine } from '@dsh/api-codegen/capi/swagger-codegen';

export function generateMockInvoiceLine(): InvoiceLine {
    return {
        product: 'test product',
        quantity: 1,
        price: 100,
    };
}
