import moment from 'moment';

import { FormParams } from './form-params';

export function toFormValue(
    { fromTime, toTime, ...params }: Record<keyof FormParams, string>,
    defaultParams: FormParams
): FormParams {
    return {
        ...defaultParams,
        ...params,
        fromTime: fromTime ? moment(fromTime) : defaultParams.fromTime,
        toTime: toTime ? moment(toTime) : defaultParams.toTime
    };
}
