import moment from 'moment';

import { SearchParams } from '../search-params';
import { FormParams } from './form-params';

export function toFormValue(
    { fromTime, toTime, period, ...params }: SearchParams,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        shopIDs: params.shopIDs ? (Array.isArray(params.shopIDs) ? params.shopIDs : [params.shopIDs]) : null,
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end,
            period: period ? period : defaultParams.date.period
        }
    };
}
