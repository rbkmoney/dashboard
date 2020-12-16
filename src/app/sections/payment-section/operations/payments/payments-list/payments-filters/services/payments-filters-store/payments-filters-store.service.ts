import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import cloneDeep from 'lodash.clonedeep';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';

import { PaymentsFiltersData } from '../../types/payments-filters-data';

@Injectable()
export class PaymentsFiltersStoreService extends QueryParamsStore<PaymentsFiltersData> {
    constructor(
        private daterangeManager: DaterangeManagerService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(router, route);
    }

    mapToData(params: Params): Partial<PaymentsFiltersData> {
        const { fromTime, toTime, invoiceIDs = [], shopIDs = [], ...restParams } = params;
        return this.removeUnusedFields({
            dateRange:
                isNil(fromTime) || isNil(toTime)
                    ? null
                    : this.daterangeManager.deserializeDateRange({ begin: fromTime, end: toTime }),
            invoiceIDs: Array.isArray(invoiceIDs) ? invoiceIDs : [invoiceIDs],
            shopIDs: Array.isArray(shopIDs) ? shopIDs : [shopIDs],
            ...restParams,
        });
    }

    mapToParams({ dateRange, additional, ...restData }: PaymentsFiltersData): Params {
        const { begin: fromTime, end: toTime } = this.daterangeManager.serializeDateRange(dateRange);
        return this.removeUnusedFields({
            fromTime,
            toTime,
            ...additional,
            ...restData,
        });
    }

    private removeUnusedFields<T>(data: T): T | Partial<T> {
        const copy = cloneDeep(data);
        return Object.entries(copy).reduce((newData: T | Partial<T>, [key, value]: [string, any]) => {
            if (!isEmpty(value)) {
                newData[key] = value;
            }
            return newData;
        }, {});
    }
}
