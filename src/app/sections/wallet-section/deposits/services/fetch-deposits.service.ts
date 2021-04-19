import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { Deposit } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { DepositsSearchParams, DepositsService as DepositsApiService } from '@dsh/api/deposits';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';
import { toMinor } from '@dsh/utils';

@Injectable()
export class FetchDepositsService extends PartialFetcher<Deposit, DepositsSearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private depositsService: DepositsApiService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
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
