import { InvoiceStatus } from '@dsh/api-codegen/anapi';

export const OPTION_LABELS: { [N in InvoiceStatus.StatusEnum] } = {
    paid: 'paid',
    cancelled: 'cancelled',
    fulfilled: 'fulfilled',
    unpaid: 'unpaid',
};
