import { DepositsSearchParams } from '@dsh/api';

import { DepositsFilters } from '../deposits-filters/types/deposits-filters';

export const filtersToSearchParams = ({
    dateRange,
    depositAmountFrom,
    depositID,
    depositStatus,
    depositAmountTo,
    sourceID,
    walletID,
    identityID,
}: DepositsFilters): DepositsSearchParams => ({
    fromTime: dateRange.start.utc().format(),
    toTime: dateRange.end.utc().format(),
    walletID,
    identityID,
    sourceID,
    depositID,
    status: depositStatus,
    amountFrom: depositAmountFrom,
    amountTo: depositAmountTo,
});
