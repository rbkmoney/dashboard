import * as moment from 'moment';
import { Params } from '@angular/router';

import { SearchFormValue } from './search-form-value';

export function toFormValue<T extends SearchFormValue>(obj: Params): T {
    return {
        ...obj,
        date: { begin: moment(obj.fromTime), end: moment(obj.toTime) }
    } as T;
}
