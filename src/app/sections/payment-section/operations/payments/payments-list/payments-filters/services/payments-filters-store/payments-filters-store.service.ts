import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import cloneDeep from 'lodash.clonedeep';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { Daterange } from '@dsh/pipes/daterange';

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
            daterange: this.formatDaterange(fromTime, toTime),
            invoiceIDs: this.formatListParams(invoiceIDs),
            shopIDs: this.formatListParams(shopIDs),
            ...restParams,
        });
    }

    mapToParams({ daterange, additional, ...restData }: PaymentsFiltersData): Params {
        const { begin: fromTime, end: toTime } = this.daterangeManager.serializeDateRange(daterange);
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

    private formatListParams(listParam: string | string[] | undefined): string[] {
        if (Array.isArray(listParam)) {
            return listParam;
        }

        if (isEmpty(listParam)) {
            return [];
        }

        return [listParam]
    }

    private formatDaterange(fromTime: string | undefined, toTime: string | undefined): Daterange | null {
        return isNil(fromTime) || isNil(toTime)
            ? null
            : this.daterangeManager.deserializeDateRange({ begin: fromTime, end: toTime })
    }
}
