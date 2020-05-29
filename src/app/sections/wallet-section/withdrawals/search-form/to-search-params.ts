import { WithdrawalsSearchParams } from '../../../../api/withdrawals/withdrawals-search-params';
import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): WithdrawalsSearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
