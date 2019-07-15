import { Params } from '@angular/router';
import mapValues from 'lodash.mapvalues';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';

import { SearchFormValue } from '../../search-form-value';

export function toQueryParams<T extends SearchFormValue>(obj: T): Params {
    const mapped = mapValues(obj, value => (isEmpty(value) ? null : value));
    console.log({
        ...mapped,
        fromTime: moment(obj.fromTime)
            .utc()
            .format(),
        toTime: moment(obj.toTime)
            .utc()
            .format()
    });
    return {
        ...mapped,
        fromTime: moment(obj.fromTime)
            .utc()
            .format(),
        toTime: moment(obj.toTime)
            .utc()
            .format()
    };
}
