import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

// better to make Payment as a class that knows how to produce its id
export const getPaymentId = (payment: PaymentSearchResult): string => {
    return `${payment.invoiceID}${payment.id}`;
};
