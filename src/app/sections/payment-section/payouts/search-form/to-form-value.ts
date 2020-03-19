import { Params } from '@angular/router';
import moment from 'moment';

import { FormParams } from './form-params';

export function toFormValue({ fromTime, toTime, ...params }: Params, defaultParams: FormParams): FormParams {
    return {
        ...defaultParams,
        ...params,
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end
        }
    };
}
