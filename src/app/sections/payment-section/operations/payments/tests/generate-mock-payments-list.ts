import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { generateMockPayment } from './generate-mock-payment';

export function generateMockPaymentsList(length: number): PaymentSearchResult[] {
    return new Array(length).fill(generateMockPayment()).map((payment: PaymentSearchResult, index: number) => {
        return {
            ...payment,
            id: `mock_payment_${index}`,
        };
    });
}
