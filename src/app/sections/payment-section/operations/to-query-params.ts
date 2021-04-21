import { Params } from '@angular/router';
import isEmpty from 'lodash-es/isEmpty';
import mapValues from 'lodash-es/mapValues';

import { SearchFormValue } from '../search-form-value';

export function toQueryParams<T extends SearchFormValue>({ date, ...obj }: T): Params {
    const mapped = mapValues(obj, (value) => (isEmpty(value) ? null : value));
    return {
        ...mapped,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
