import mapValues from 'lodash.mapvalues';
import * as moment from 'moment';

export const toQueryParams = (obj: any, urlDateFormat = 'YYYY-MM-DD'): Object => {
    const mapped = mapValues(obj, value => (value === '' ? null : value));
    return {
        ...mapped,
        fromTime: moment(obj.fromTime).format(urlDateFormat),
        toTime: moment(obj.toTime).format(urlDateFormat)
    };
};
