import { Daterange } from '@dsh/pipes/daterange';

import { SearchParams } from '../search-params';

export const daterangeToSearchParams = ({ begin, end }: Daterange): Partial<SearchParams> => ({
    fromTime: begin.utc().format(),
    toTime: end.utc().format(),
});
