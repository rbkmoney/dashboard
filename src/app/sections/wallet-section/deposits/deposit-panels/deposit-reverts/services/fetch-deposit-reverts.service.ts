import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DepositsSearchParams, DepositsService as DepositsApiService } from '@dsh/api';
import { DepositRevert } from '@dsh/api-codegen/wallet-api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { DEBOUNCE_FETCHER_ACTION_TIME, IndicatorsPartialFetcher } from '../../../../../partial-fetcher';

@Injectable()
export class FetchDepositRevertsService extends IndicatorsPartialFetcher<DepositRevert, DepositsSearchParams> {
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

    protected fetch(params: DepositsSearchParams, continuationToken: string) {
        return this.depositsService.listDepositReverts({ ...params }, this.searchLimit, continuationToken).pipe(
            catchError(() => {
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                return of({ result: [] });
            })
        );
    }
}
