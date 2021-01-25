import { Daterange } from '@dsh/pipes/daterange';

import { PaymentBinPan } from './payment-bin-pan';
import { PaymentsAdditionalFilters } from './payments-additional-filters';

export interface PaymentsFiltersData {
    daterange: Daterange;
    invoiceIDs?: string[];
    shopIDs?: string[];
    binPan?: PaymentBinPan;
    additional?: PaymentsAdditionalFilters;
}
