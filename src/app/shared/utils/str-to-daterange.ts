import moment from 'moment';

import { Daterange } from '@dsh/pipes/daterange';

export const strToDaterange = ({ fromTime, toTime }: { fromTime: string; toTime: string }): Daterange => ({
    begin: moment(fromTime),
    end: moment(toTime),
});
