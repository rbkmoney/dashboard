import mapValues from 'lodash.mapvalues';
import * as moment from 'moment';
import { Params } from '@angular/router';

import { SearchFormValue } from './search-form-value';

export function toQueryParams<T extends SearchFormValue>(obj: T): Params {
    const mapped = mapValues(obj, value => (value ? null : value));
    return {
        ...mapped,
        fromTime: moment(obj.fromTime).utc().format(),
        toTime: moment(obj.toTime).utc().format()
    };
}
