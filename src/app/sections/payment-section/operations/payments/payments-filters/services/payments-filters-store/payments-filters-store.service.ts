import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import isNil from 'lodash.isnil';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { Daterange } from '@dsh/pipes/daterange';
import { removeDictEmptyFields } from '@dsh/utils';

import { PaymentsFiltersData } from '../../types/payments-filters-data';
import { formatPaymentAmountDataToParams } from '../../utils/format-payment-amount-data-to-params';
import { getBinPanDataFromParams } from '../../utils/get-bin-pan-data-from-params';
import { getListFiltersDataFromParams } from '../../utils/get-list-filters-data-from-params';
import { getPaymentAmountDataFromParams } from '../../utils/get-payment-amount-data-from-params';

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
        const {
            fromTime,
            toTime,
            shopIDs,
            invoiceIDs,
            first6,
            last4,
            paymentAmountFrom,
            paymentAmountTo,
            ...restParams
        } = params;

        return removeDictEmptyFields({
            daterange: this.formatDaterange(fromTime, toTime),
            binPan: getBinPanDataFromParams({
                first6,
                last4,
            }),
            ...getListFiltersDataFromParams({ shopIDs, invoiceIDs }),
            additional: {
                ...getPaymentAmountDataFromParams({
                    paymentAmountFrom,
                    paymentAmountTo,
                }),
                ...restParams,
            },
        });
    }

    mapToParams({ daterange, binPan, additional, ...restData }: PaymentsFiltersData): Params {
        const { begin: fromTime, end: toTime } = this.daterangeManager.serializeDateRange(daterange);
        const { bin = null, pan = null } = binPan ?? {};
        const { paymentAmountFrom, paymentAmountTo, ...restAdditional } = additional ?? {};

        return removeDictEmptyFields({
            fromTime,
            toTime,
            first6: bin,
            last4: pan,
            ...formatPaymentAmountDataToParams({
                paymentAmountFrom,
                paymentAmountTo,
            }),
            ...restAdditional,
            ...restData,
        });
    }

    private formatDaterange(fromTime: string | undefined, toTime: string | undefined): Daterange | null {
        return isNil(fromTime) || isNil(toTime)
            ? null
            : this.daterangeManager.deserializeDateRange({ begin: fromTime, end: toTime });
    }
}
