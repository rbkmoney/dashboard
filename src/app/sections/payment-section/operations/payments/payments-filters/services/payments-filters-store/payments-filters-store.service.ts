import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { Daterange } from '@dsh/pipes/daterange';
import { wrapValuesToArray } from '@dsh/utils';

import { BIN_LENGTH, PAN_LENGTH } from '../../card-bin-pan-filter';
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
        const { fromTime, toTime } = params;
        return this.removeUnusedFields({
            daterange: this.formatDaterange(fromTime, toTime),
            binPan: this.getBinPanParams(params),
            ...this.getListParams(params),
        });
    }

    mapToParams({
        daterange,
        binPan: { paymentMethod, bin = null, pan = null },
        additional,
    }: PaymentsFiltersData): Params {
        const { begin: fromTime, end: toTime } = this.daterangeManager.serializeDateRange(daterange);
        return this.removeUnusedFields({
            fromTime,
            toTime,
            first6: bin,
            last4: pan,
            ...additional,
        });
    }

    private removeUnusedFields<T>(data: T): T | Partial<T> {
        return Object.entries(data).reduce((newData: T | Partial<T>, [key, value]: [string, any]) => {
            if (!isEmpty(value)) {
                newData[key] = value;
            }
            return newData;
        }, {});
    }

    private getBinPanParams({ first6, last4 }: Params): PaymentsFiltersData['binPan'] {
        const bin = Number(first6);
        const pan = Number(last4);

        return {
            paymentMethod: 'bankCard',
            bin: isNaN(bin) || first6.length !== BIN_LENGTH ? null : first6,
            pan: isNaN(pan) || last4.length !== PAN_LENGTH ? null : last4,
        };
    }

    private getListParams(params: Params): Partial<PaymentsFiltersData> {
        const listParams = pickBy(
            params,
            (value: unknown, key: keyof PaymentsFiltersData) =>
                ['shopIDs', 'invoiceIDs'].includes(key) && isString(value) && !isEmpty(value)
        );
        return {
            ...wrapValuesToArray(listParams),
        };
    }

    private formatDaterange(fromTime: string | undefined, toTime: string | undefined): Daterange | null {
        return isNil(fromTime) || isNil(toTime)
            ? null
            : this.daterangeManager.deserializeDateRange({ begin: fromTime, end: toTime });
    }
}
