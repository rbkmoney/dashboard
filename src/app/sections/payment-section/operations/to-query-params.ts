import { Params } from '@angular/router';
import isEmpty from 'lodash.isempty';
import mapValues from 'lodash.mapvalues';

import { SearchFormValue } from '../search-form-value';

export function toQueryParams<T extends SearchFormValue>({ date, ...obj }: T): Params {
    const mapped = mapValues(obj, value => (isEmpty(value) ? null : value));
    return {
        ...mapped,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format()
    };
}
