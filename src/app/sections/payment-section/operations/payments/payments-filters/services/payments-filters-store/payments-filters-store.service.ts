import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { isNumber } from '@dsh/app/shared/utils';
import { Daterange } from '@dsh/pipes/daterange';
import { removeDictEmptyFields, toMajor, toMinor, wrapValuesToArray } from '@dsh/utils';

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
            binPan: this.getBinPanParams({
                first6,
                last4,
            }),
            ...this.getListParams({ shopIDs, invoiceIDs }),
            additional: {
                ...this.getPaymentAmountParams({
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
            paymentAmountFrom: isNumber(paymentAmountFrom) ? toMinor(paymentAmountFrom) : null,
            paymentAmountTo: isNumber(paymentAmountTo) ? toMinor(paymentAmountTo) : null,
            ...restAdditional,
            ...restData,
        });
    }

    private getBinPanParams({ first6, last4 }: Params): PaymentsFiltersData['binPan'] | null {
        const bin = Number(first6);
        const pan = Number(last4);
        const isValidBin = !isNil(first6) && !isNaN(bin) && first6.length === BIN_LENGTH;
        const isValidPan = !isNil(last4) && !isNaN(pan) && last4.length === PAN_LENGTH;

        if (isValidBin || isValidPan) {
            return {
                paymentMethod: 'bankCard',
                bin: isValidBin ? first6 : null,
                pan: isValidPan ? last4 : null,
            };
        }

        return null;
    }

    private getPaymentAmountParams({
        paymentAmountFrom,
        paymentAmountTo,
    }: {
        paymentAmountFrom: string;
        paymentAmountTo: string;
    }): Partial<{ paymentAmountFrom: number; paymentAmountTo: number }> {
        const amountFromNum = Number(paymentAmountFrom);
        const amountToNum = Number(paymentAmountTo);

        return removeDictEmptyFields({
            paymentAmountFrom: isNil(paymentAmountFrom) || isNaN(amountFromNum) ? null : toMajor(amountFromNum),
            paymentAmountTo: isNil(paymentAmountTo) || isNaN(amountToNum) ? null : toMajor(amountToNum),
        });
    }

    private getListParams(params: Params): Partial<PaymentsFiltersData> {
        const nonEmptyListParams = pickBy(
            params,
            (value: unknown, key: keyof PaymentsFiltersData) =>
                ['shopIDs', 'invoiceIDs'].includes(key) && !isEmpty(value)
        );
        const stringListParams = pickBy(nonEmptyListParams, (value: unknown) => isString(value));

        return {
            ...nonEmptyListParams,
            ...wrapValuesToArray(stringListParams),
        };
    }

    private formatDaterange(fromTime: string | undefined, toTime: string | undefined): Daterange | null {
        return isNil(fromTime) || isNil(toTime)
            ? null
            : this.daterangeManager.deserializeDateRange({ begin: fromTime, end: toTime });
    }
}
