import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { DepositsService, DepositsWithToken } from '@dsh/api';
import { Deposit } from '@dsh/api-codegen/wallet-api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

@UntilDestroy()
@Injectable()
export class FetchWalletDepositsService extends PartialFetcher<Deposit, string> {
    constructor(
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        private depositsService: DepositsService
    ) {
        super();
    }

    protected fetch(walletID: string, continuationToken: string): Observable<DepositsWithToken> {
        return this.depositsService.listDeposits({ walletID }, this.searchLimit, continuationToken);
    }
}
