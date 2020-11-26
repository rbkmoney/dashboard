import { Daterange } from '@dsh/pipes/daterange';

import { SearchFiltersParams } from '../types/search-filters-params';

export const daterangeToSearchFilterParams = ({ begin, end }: Daterange): Partial<SearchFiltersParams> => ({
    fromTime: begin.utc().format(),
    toTime: end.utc().format(),
});
