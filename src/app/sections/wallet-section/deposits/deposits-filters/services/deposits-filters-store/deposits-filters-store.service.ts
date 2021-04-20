import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { DaterangeManagerService } from '@dsh/app/shared/services/date-range-manager';
import { Daterange } from '@dsh/pipes/daterange';
import { isNil, removeDictEmptyFields } from '@dsh/utils';

import { DepositsFiltersData } from '../../types/deposits-filters-data';
import { formatDepositAmountDataToParams } from '../../utils/format-deposit-amount-data-to-params';
import { getDepositAmountDataFromParams } from '../../utils/get-deposit-amount-data-from-params';

@Injectable()
export class DepositsFiltersStoreService extends QueryParamsStore<DepositsFiltersData> {
    constructor(
        private daterangeManager: DaterangeManagerService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(router, route);
    }

    mapToData(params: Params): Partial<DepositsFiltersData> {
        const { fromTime, toTime, depositAmountFrom, depositAmountTo, ...restParams } = params;

        return removeDictEmptyFields({
            daterange: this.formatDaterange(fromTime, toTime),
            additional: {
                ...getDepositAmountDataFromParams({
                    depositAmountTo,
                    depositAmountFrom,
                }),
                ...restParams,
            },
        });
    }

    mapToParams({ daterange, additional, ...restData }: DepositsFiltersData): Params {
        const { begin: fromTime, end: toTime } = this.daterangeManager.serializeDateRange(daterange);
        const { depositAmountFrom, depositAmountTo, ...restAdditional } = additional ?? {};

        return removeDictEmptyFields({
            fromTime,
            toTime,
            ...formatDepositAmountDataToParams({
                depositAmountFrom,
                depositAmountTo,
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
