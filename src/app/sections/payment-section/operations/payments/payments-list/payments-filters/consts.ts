import { InjectionToken } from '@angular/core';

import { PaymentsFiltersData } from './types/payments-filters-data';

export const DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN = new InjectionToken<Partial<PaymentsFiltersData>>(
    'defaultPaymentsFiltersDataToken'
);
export const DEFAULT_PAYMENTS_FILTERS_DATA: Partial<PaymentsFiltersData> = {
    invoiceIDs: [],
    shopIDs: [],
    additional: {},
};
