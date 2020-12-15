import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import moment from 'moment';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { PaymentsFiltersData } from '../../types/payments-filters-data';

@Injectable()
export class PaymentsFiltersStoreService extends QueryParamsStore<PaymentsFiltersData> {
    mapToData({ beginDate, endDate, ...restParams }: Params): Partial<PaymentsFiltersData> {
        return {
            dateRange: {
                begin: moment(beginDate),
                end: moment(endDate),
            },
            ...restParams,
        };
    }

    mapToParams({ dateRange, additional, ...restData }: PaymentsFiltersData): Params {
        return {
            beginDate: dateRange.begin.utc().format(),
            endDate: dateRange.end.utc().format(),
            ...additional,
            ...restData,
        };
    }
}
