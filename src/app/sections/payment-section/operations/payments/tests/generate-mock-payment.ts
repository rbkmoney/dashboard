import { PaymentSearchResult } from '@dsh/api-codegen/capi';

import { Payment } from '../types/payment';

export function generateMockPayment(data: Partial<Payment> = {}) {
    return {
        amount: 0,
        currency: 'USD',
        status: PaymentSearchResult.StatusEnum.Pending,
        statusChangedAt: new Date().toDateString(),
        invoiceID: 'invoiceID',
        shopName: 'shopName',
        paymentID: 'paymentID',
        fee: 0,
        payer: {
            payerType: 'mine',
            paymentToolDetails: {
                detailsType: 'mine',
            },
        },
        ...data,
    };
}
