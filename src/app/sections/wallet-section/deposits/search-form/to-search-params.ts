// import { WithdrawalsSearchParams } from '../../../../api/deposits/deposits-search-params';
// import { DepositSearchFormValue } from './deposit-search-form-value';
// import { FormParams } from './form-params';
//
// export function toSearchParams({ date, ...params }: FormParams): WithdrawalsSearchParams {
//     return {
//         ...params,
//         fromTime: date.begin.utc().format(),
//         toTime: date.end.utc().format(),
//     };
// }

import { DepositsSearchParams } from '../../../../api/deposits/deposits-search-params';
import { FormParams } from './form-params';

export function toSearchParams({ date, ...params }: FormParams): DepositsSearchParams {
    return {
        ...params,
        fromTime: date.begin.utc().format(),
        toTime: date.end.utc().format(),
    };
}
