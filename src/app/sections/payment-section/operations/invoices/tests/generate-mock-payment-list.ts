import { Payment } from '@dsh/api-codegen/capi';

import { generateMockPayment } from './generate-mock-payment';

export function generateMockPaymentList(count: number, offset = 0): Payment[] {
    return new Array(count).fill(null).map((_, i) => generateMockPayment(`mock_payment_${i + offset}`));
}
