import moment from 'moment';

import { Daterange } from '@dsh/pipes/daterange';

export const getDefaultDaterange = (): Daterange => ({
    begin: moment().startOf('M'),
    end: moment().endOf('M'),
});
