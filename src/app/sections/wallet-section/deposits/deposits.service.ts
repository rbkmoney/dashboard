import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, first, map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { DepositsService as DepositsApiService } from '../../../api';
import { Deposit } from '../../../api-codegen/wallet-api/swagger-codegen';
import { DepositsSearchParams } from '../../../api/deposits/deposits-search-params';
import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';

@Injectable()
export class DepositsService extends PartialFetcher<Deposit, DepositsSearchParams> {
    private limit = 20;

    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    selectedId$ = this.route.fragment.pipe(
        first(),
        switchMap((fragment) => (fragment ? this.loadSelected(fragment) : of(-1))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private depositsService: DepositsApiService, private route: ActivatedRoute, private router: Router) {
        super();
        this.selectedId$.subscribe();
    }

    select(id: number) {
        this.searchResult$.pipe(pluck(id, 'id')).subscribe((fragment) => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    loadSelected(id: string) {
        return this.fetchResultChanges$.pipe(
            map(({ hasMore, result }) => {
                const idx = result.findIndex((p) => p.id === id);
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

    protected fetch(params: DepositsSearchParams, continuationToken: string) {
        return this.depositsService.listDeposits({ ...params }, this.limit, continuationToken);
    }
}
