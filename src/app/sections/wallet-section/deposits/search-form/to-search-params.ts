import { DepositsSearchParams } from '@dsh/api/deposits';

import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): DepositsSearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
