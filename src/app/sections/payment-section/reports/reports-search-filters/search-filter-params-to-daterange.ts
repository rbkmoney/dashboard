import moment from 'moment';

import { Daterange } from '@dsh/pipes/daterange';

import { SearchFiltersParams } from './search-filters-params';

export const searchFilterParamsToDaterange = ({ fromTime, toTime }: SearchFiltersParams): Daterange => ({
    begin: moment(fromTime),
    end: moment(toTime),
});
