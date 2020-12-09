import { WithdrawalsSearchParams } from '@dsh/api/withdrawals';

import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): WithdrawalsSearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
