import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DEBOUNCE_FETCHER_ACTION_TIME } from '@rbkmoney/partial-fetcher';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Deposit } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { DepositsSearchParams, DepositsService as DepositsApiService } from '@dsh/api/deposits';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { toMinor } from '@dsh/utils';

import { IndicatorsPartialFetcher } from '../../../partial-fetcher';

@Injectable()
export class FetchDepositsService extends IndicatorsPartialFetcher<Deposit, DepositsSearchParams> {
    constructor(
        private depositsService: DepositsApiService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        protected debounceActionTime: number
    ) {
        super(searchLimit, debounceActionTime);
    }

    protected fetch({ amountTo, amountFrom, ...params }: DepositsSearchParams, continuationToken: string) {
        return this.depositsService
            .listDeposits(
                {
                    ...params,
                    amountFrom: isNumber(amountFrom) ? toMinor(amountFrom) : undefined,
                    amountTo: isNumber(amountTo) ? toMinor(amountTo) : undefined,
                },
                this.searchLimit,
                continuationToken
            )
            .pipe(
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                    return of({ result: [] });
                })
            );
    }
}
