import { Inject, Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { Wallet } from '@dsh/api-codegen/wallet-api';
import { WalletService } from '@dsh/api/wallet';
import { WalletsSearchParams } from '@dsh/api/wallet/wallets-search-params';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { booleanDebounceTime, mapToTimestamp, publishReplayRefCount } from '@dsh/operators';

@Injectable()
export class FetchWalletsService extends PartialFetcher<Wallet, WalletsSearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), publishReplayRefCount(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, publishReplayRefCount(1));

    constructor(@Inject(SEARCH_LIMIT) private searchLimit: number, private walletService: WalletService) {
        super();
    }

    protected fetch(params: WalletsSearchParams, continuationToken: string): Observable<FetchResult<Wallet>> {
        return this.walletService.listWallets(this.searchLimit, params, continuationToken);
    }
}
