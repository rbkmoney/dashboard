import { removeDictEmptyFields } from '@dsh/utils';

import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const formToFilters = ({
    main,
    paymentStatus,
    paymentSum,
    paymentSystem,
    tokenProvider,
    binPan,
    shops,
    invoices,
}: AdditionalFiltersForm): AdditionalFilters =>
    removeDictEmptyFields({
        ...main,
        ...shops,
        ...invoices,
        ...paymentSum,
        binPan,
        tokenProvider,
        paymentSystem,
        paymentStatus,
    });
