import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { DepositsSearchParams, DepositsService as DepositsApiService } from '@dsh/api';
import { DepositRevert } from '@dsh/api-codegen/wallet-api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

@Injectable()
export class FetchDepositRevertsService extends PartialFetcher<DepositRevert, DepositsSearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    // lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

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

    protected fetch(params: DepositsSearchParams, continuationToken: string) {
        return this.depositsService.listDepositReverts({ ...params }, this.searchLimit, continuationToken).pipe(
            catchError(() => {
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                return of({ result: [] });
            })
        );
    }
}
