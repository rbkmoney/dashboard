import { Daterange } from '@dsh/pipes/daterange';

import { AdditionalFilters } from '../additional-filters';
import { PaymentBinPan } from './payment-bin-pan';

export interface PaymentsFiltersData {
    daterange: Daterange;
    invoiceIDs?: string[];
    shopIDs?: string[];
    binPan?: PaymentBinPan;
    additional?: AdditionalFilters;
}
