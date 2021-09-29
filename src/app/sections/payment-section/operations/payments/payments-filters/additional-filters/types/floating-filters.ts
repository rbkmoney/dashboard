import { PaymentStatus } from '@dsh/api-codegen/anapi';

import { InvoicesFilterForm } from '../invoices-filter';
import { ShopsFilterForm } from '../shops-filter';

export type FloatingFilters = Partial<InvoicesFilterForm> &
    Partial<ShopsFilterForm> & {
        paymentStatus?: PaymentStatus.StatusEnum;
    };
