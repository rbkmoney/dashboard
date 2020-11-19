import { Daterange } from '@dsh/pipes/daterange';
import moment from 'moment';

export const timesToDaterange = <T extends { fromTime: string; toTime: string }>({ fromTime, toTime }: T): Daterange => ({
    begin: moment(fromTime),
    end: moment(toTime)
});
