import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { WithdrawalsService } from '@dsh/api';
import { Withdrawal } from '@dsh/api-codegen/wallet-api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

@UntilDestroy()
@Injectable()
export class FetchWalletWithdrawalsService extends PartialFetcher<Withdrawal, string> {
    constructor(
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        private withdrawalsService: WithdrawalsService
    ) {
        super();
    }

    protected fetch(walletID: string, continuationToken: string): Observable<unknown> {
        return this.withdrawalsService.listWithdrawals({ walletID }, this.searchLimit, continuationToken);
    }
}
