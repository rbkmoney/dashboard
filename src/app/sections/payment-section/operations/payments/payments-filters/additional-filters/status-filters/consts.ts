import { PaymentStatus } from '@dsh/api-codegen/anapi';

export const PAYMENT_STATUSES_LIST: PaymentStatus.StatusEnum[] = [
    'pending',
    'processed',
    'captured',
    'cancelled',
    'refunded',
    'failed',
];
