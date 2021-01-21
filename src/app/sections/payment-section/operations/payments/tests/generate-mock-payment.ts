import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

export function generateMockPayment(data: Partial<PaymentSearchResult> = {}): PaymentSearchResult {
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
            payerType: 'CustomerPayer',
        },
        flow: {
            type: 'PaymentFlowHold',
        },
        externalID: 'externalID',
        flow: {
            type: 'PaymentFlowHold',
        },
        ...data,
    };
}
