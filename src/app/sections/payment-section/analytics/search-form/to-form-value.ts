import moment from 'moment';

import { FormParams } from './form-params';
import { QueryParams } from './query-params';

export function toFormValue(
    { fromTime, toTime, ...params }: QueryParams,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        date: {
            begin: fromTime ? moment(fromTime) : defaultParams.date.begin,
            end: toTime ? moment(toTime) : defaultParams.date.end
        }
    };
}
