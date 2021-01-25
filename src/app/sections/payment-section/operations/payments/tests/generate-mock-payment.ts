import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

// function was made to simplify to compare test dates
function makeCurrentDate(): Date {
    return new Date().toDateString() as any;
}

export function generateMockPayment(data: Partial<PaymentSearchResult> = {}): PaymentSearchResult {
    return {
        id: 'paymentID',
        amount: 0,
        currency: 'USD',
        status: PaymentSearchResult.StatusEnum.Pending,
        createdAt: makeCurrentDate(),
        statusChangedAt: makeCurrentDate(),
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
        ...data,
    };
}
