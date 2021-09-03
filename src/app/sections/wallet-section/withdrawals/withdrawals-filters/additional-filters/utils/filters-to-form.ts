import { isNumber } from '@dsh/app/shared/utils';
import { toMajor } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const filtersToForm = ({
    withdrawalID = null,
    walletID = null,
    identityID = null,
    destinationID = null,
    status = null,
    amountFrom = null,
    amountTo = null,
}: AdditionalFilters): AdditionalFiltersForm => ({
    mainInfo: {
        withdrawalID,
        walletID,
        identityID,
        destinationID,
    },
    status,
    amount: {
        amountFrom: isNumber(amountFrom) ? toMajor(amountFrom) : null,
        amountTo: isNumber(amountTo) ? toMajor(amountTo) : null,
    },
});
