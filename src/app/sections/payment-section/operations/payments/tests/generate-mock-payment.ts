import { PaymentSearchResult } from '@dsh/api-codegen/capi';

import { Payment } from '../types/payment';

export function generateMockPayment(data: Partial<Payment> = {}): Payment {
    return {
        id: 'invoiceID_paymentID',
        paymentID: 'paymentID',
        amount: 0,
        currency: 'USD',
        status: PaymentSearchResult.StatusEnum.Pending,
        statusChangedAt: new Date().toDateString(),
        invoiceID: 'invoiceID',
        shopID: 'shopID',
        shopName: 'shopName',
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
