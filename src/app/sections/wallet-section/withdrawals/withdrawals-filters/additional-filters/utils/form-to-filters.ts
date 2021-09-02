import { isNumber } from '@dsh/app/shared/utils';
import { removeDictEmptyFields, toMinor } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const formToFilters = ({ mainInfo, status, amount }: AdditionalFiltersForm): AdditionalFilters =>
    removeDictEmptyFields({
        ...mainInfo,
        status,
        amountFrom: isNumber(amount?.amountFrom) ? toMinor(amount.amountFrom) : null,
        amountTo: isNumber(amount?.amountTo) ? toMinor(amount.amountTo) : null,
    });
