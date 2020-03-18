import { Params } from '@angular/router';
import * as moment from 'moment';

import { SearchFormValue } from './search-form-value';

export function toFormValue<T extends SearchFormValue>(obj: Params): T {
    return {
        ...obj,
        fromTime: moment(obj.fromTime),
        toTime: moment(obj.toTime)
    } as T;
}
