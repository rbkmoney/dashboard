import moment from 'moment';

import { Daterange } from '@dsh/pipes/daterange';

import { SearchFiltersParams } from './search-filters-params';

export const searchFilterParamsToDaterange = ({ fromTime, toTime }: SearchFiltersParams): Daterange => ({
    begin: fromTime ? moment(fromTime) : moment().startOf('m'),
    end: toTime ? moment(toTime) : moment().endOf('m'),
});
