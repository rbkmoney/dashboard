import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import {
    catchError,
    filter,
    first,
    map,
    mapTo,
    pluck,
    shareReplay,
    startWith,
    switchMap,
    take,
    tap
} from 'rxjs/operators';

import { Wallet } from '../../../api-codegen/wallet-api/swagger-codegen';
import { WalletService } from '../../../api/wallet';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';

@Injectable()
export class ReceiveWalletsService extends PartialFetcher<Wallet, null> {
    private readonly searchLimit = 20;

    wallets$ = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );
    selectedIdx$ = this.route.fragment.pipe(
        first(),
        switchMap(fragment => (fragment ? this.loadSelected(fragment) : of(-1))),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isInit$ = this.selectedIdx$.pipe(mapTo(false), startWith(true), shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private walletService: WalletService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private transloco: TranslocoService
    ) {
        super();
    }

    loadSelected(id: string) {
        return this.fetchResultChanges$.pipe(
            map(({ hasMore, result: payouts }) => {
                const idx = payouts.findIndex(p => p.id === id);
                return { idx, isContinueToFetch: idx === -1 && hasMore };
            }),
            tap(({ isContinueToFetch }) => {
                if (isContinueToFetch) {
                    this.fetchMore();
                }
            }),
            take(10),
            filter(({ isContinueToFetch }) => !isContinueToFetch),
            pluck('idx'),
            first(null, -1)
        );
    }

    select(idx: number) {
        this.searchResult$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    protected fetch(continuationToken: string): Observable<FetchResult<Wallet>> {
        return this.walletService.listWallets(this.searchLimit, undefined, undefined, continuationToken);
    }
}
