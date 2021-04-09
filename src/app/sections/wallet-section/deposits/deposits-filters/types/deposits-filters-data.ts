import { Daterange } from '@dsh/pipes/daterange';

import { AdditionalFilters } from '../additional-filters/types/additional-filters';

export interface DepositsFiltersData {
    daterange: Daterange;
    additional?: AdditionalFilters;
}
