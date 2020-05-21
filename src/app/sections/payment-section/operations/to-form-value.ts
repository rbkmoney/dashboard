import { Params } from '@angular/router';
import * as moment from 'moment';

import { SearchFormValue } from '../search-form-value';

export function toFormValue<T extends SearchFormValue>(obj: Params): T {
    return {
        ...obj,
        shopIDs: Array.isArray(obj.shopIDs) ? obj.shopIDs : [obj.shopIDs],
        date: { begin: moment(obj.fromTime), end: moment(obj.toTime) },
    } as T;
}
