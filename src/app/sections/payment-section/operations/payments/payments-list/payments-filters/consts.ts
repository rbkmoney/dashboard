import { InjectionToken } from '@angular/core';
import moment from 'moment';

import { PaymentsFiltersData } from './types/payments-filters-data';

export const DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN = new InjectionToken<PaymentsFiltersData>(
    'defaultPaymentsFiltersDataToken'
);
export const DEFAULT_PAYMENTS_FILTERS_DATA: PaymentsFiltersData = {
    dateRange: {
        begin: moment().startOf('month'),
        end: moment().endOf('month'),
    },
    invoiceIds: [],
    shopIds: [],
    additional: {},
};
