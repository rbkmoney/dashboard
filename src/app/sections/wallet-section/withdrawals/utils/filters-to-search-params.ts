import { WithdrawalsSearchParams } from '@dsh/api';
import { isNumber } from '@dsh/app/shared/utils';
import { toMinor } from '@dsh/utils';

import { WithdrawalsFilters } from '../withdrawals-filters/types/withdrawals-filters';

export const filtersToSearchParams = ({
    dateRange,
    withdrawalID,
    walletID,
    identityID,
    destinationID,
    amountFrom,
    amountTo,
    status,
}: WithdrawalsFilters): WithdrawalsSearchParams => ({
    fromTime: dateRange.start.utc().format(),
    toTime: dateRange.end.utc().format(),
    walletID,
    identityID,
    withdrawalID,
    destinationID,
    status,
    amountFrom: isNumber(amountFrom) ? toMinor(amountFrom) : undefined,
    amountTo: isNumber(amountTo) ? toMinor(amountTo) : undefined,
});
