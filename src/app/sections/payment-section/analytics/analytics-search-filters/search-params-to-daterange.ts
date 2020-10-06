import moment from 'moment';

import { Daterange } from '@dsh/pipes/daterange';

import { SearchParams } from '../search-params';

export const searchParamsToDaterange = ({ fromTime, toTime }: SearchParams): Daterange => ({
    begin: moment(fromTime),
    end: moment(toTime),
});
