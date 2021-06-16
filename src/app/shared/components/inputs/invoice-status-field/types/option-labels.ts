import { InvoiceStatus } from '@dsh/api-codegen/anapi';

import StatusEnum = InvoiceStatus.StatusEnum;

export const OPTION_LABELS = {
    [StatusEnum.Paid]: 'paid',
    [StatusEnum.Cancelled]: 'cancelled',
    [StatusEnum.Fulfilled]: 'fulfilled',
    [StatusEnum.Unpaid]: 'unpaid',
};
