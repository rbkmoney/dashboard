import { Daterange } from '@dsh/pipes/daterange';

import { PaymentsAdditionalFilters } from './payments-additional-filters';

export interface PaymentsFiltersData {
    daterange: Daterange;
    invoiceIDs?: string[];
    shopIDs?: string[];
    additional?: PaymentsAdditionalFilters;
}
