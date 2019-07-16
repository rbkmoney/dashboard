import { Params } from '@angular/router';
import mapValues from 'lodash.mapvalues';
import isEmpty from 'lodash.isempty';

import { SearchFormValue } from '../../search-form-value';

export function toQueryParams<T extends SearchFormValue>(obj: T): Params {
    const mapped = mapValues(obj, value => (isEmpty(value) ? null : value));
    return {
        ...mapped,
        fromTime: obj.fromTime.utc().format(),
        toTime: obj.toTime.utc().format()
    };
}
