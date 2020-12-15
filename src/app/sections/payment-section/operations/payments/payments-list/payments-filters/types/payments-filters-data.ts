import { Daterange } from '@dsh/pipes/daterange';

import { PaymentsAdditionalFilters } from './payments-additional-filters';

export interface PaymentsFiltersData {
    dateRange: Daterange;
    invoiceIds: string[];
    shopIds: string[];
    additional: PaymentsAdditionalFilters;
}
