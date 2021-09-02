import { isNumber } from '@dsh/app/shared/utils';
import { removeDictEmptyFields, toMajor } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

const prepareFormObject = (o: Record<string, unknown>): Record<string, unknown> =>
    Object.keys(removeDictEmptyFields(o)).length ? o : {};

export const filtersToForm = ({
    withdrawalID = null,
    walletID = null,
    identityID = null,
    destinationID = null,
    status = null,
    amountFrom = null,
    amountTo = null,
}: AdditionalFilters): AdditionalFiltersForm =>
    removeDictEmptyFields({
        mainInfo: prepareFormObject({
            withdrawalID,
            walletID,
            identityID,
            destinationID,
        }),
        status,
        amount: prepareFormObject({
            amountFrom: isNumber(amountFrom) ? toMajor(amountFrom) : null,
            amountTo: isNumber(amountTo) ? toMajor(amountTo) : null,
        }),
    });
