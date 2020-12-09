import { PaymentStatus } from '@dsh/api-codegen/anapi/swagger-codegen';

export const paymentStatuses: PaymentStatus.StatusEnum[] = [
    'pending',
    'processed',
    'captured',
    'cancelled',
    'refunded',
    'failed',
];
