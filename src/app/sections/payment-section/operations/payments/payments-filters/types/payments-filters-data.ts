import { Daterange } from '@dsh/pipes/daterange';

import { AdditionalFilters } from '../additional-filters';
import { CardBinPan } from '../card-bin-pan-filter';

export interface PaymentsFiltersData {
    daterange: Daterange;
    invoiceIDs?: string[];
    shopIDs?: string[];
    binPan?: CardBinPan;
    additional?: AdditionalFilters;
}
