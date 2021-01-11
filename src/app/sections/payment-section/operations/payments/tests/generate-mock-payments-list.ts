import { Payment } from '../types/payment';
import { generateMockPayment } from './generate-mock-payment';

export function generateMockPaymentsList(length: number): Payment[] {
    return new Array(length).fill(generateMockPayment()).map((payment: Payment, index: number) => {
        const paymentID = `mock_payment_${index}`;
        return {
            ...payment,
            paymentID,
            id: `${payment.invoiceID}_${paymentID}`,
        };
    });
}
