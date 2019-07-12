import mapValues from 'lodash.mapvalues';
import * as moment from 'moment';
import { Params } from '@angular/router';

export const toQueryParams = (obj: any, urlDateFormat = 'YYYY-MM-DD'): Params => {
    const mapped = mapValues(obj, value => (value === '' ? null : value));
    return {
        ...mapped,
        fromTime: moment(obj.fromTime).format(urlDateFormat),
        toTime: moment(obj.toTime).format(urlDateFormat)
    };
};
