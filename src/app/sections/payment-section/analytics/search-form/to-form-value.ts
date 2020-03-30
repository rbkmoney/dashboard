import moment from 'moment';

import { FormParams } from './form-params';
import { QueryParams } from './query-params';

export function toFormValue(
    { fromTime, toTime, period, ...params }: QueryParams,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        shopIDs: Array.isArray(params.shopIDs) ? params.shopIDs : [params.shopIDs],
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end,
            period: period ? period : defaultParams.date.period
        }
    };
}
