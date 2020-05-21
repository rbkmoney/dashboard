import { Params } from '@angular/router';
import moment from 'moment';

import { FormParams } from './form-params';

export function toFormValue({ fromTime, toTime, period, ...params }: Params, defaultParams: FormParams): FormParams {
    return {
        ...defaultParams,
        ...params,
        shopIDs: params.shopIDs ? (Array.isArray(params.shopIDs) ? params.shopIDs : [params.shopIDs]) : null,
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end,
            period: period ? period : defaultParams.date.period,
        },
    };
}
