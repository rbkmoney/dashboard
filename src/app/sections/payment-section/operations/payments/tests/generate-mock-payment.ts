import { PaymentSearchResult } from '@dsh/api-codegen/capi';

import { Payment } from '../types/payment';

export function generateMockPayment(data: Partial<Payment> = {}): Payment {
    return {
        id: 'paymentID',
        amount: 0,
        currency: 'USD',
        status: PaymentSearchResult.StatusEnum.Pending,
        createdAt: new Date(),
        statusChangedAt: new Date(),
        invoiceID: 'invoiceID',
        shopID: 'shopID',
        fee: 0,
        payer: {
            payerType: 'mine',
            paymentToolDetails: {
                detailsType: 'mine',
            },
        },
        externalID: 'externalID',
        flow: {
            type: 'PaymentFlowHold',
        },
        ...data,
    };
}
