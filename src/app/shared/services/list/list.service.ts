import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared/services';
import { ListCachingService } from '@dsh/app/shared/services/list-caching/list-caching.service';

import { IndicatorsPartialFetcher } from '../../../sections/partial-fetcher';
import { PAYMENTS_UPDATE_DELAY_TOKEN } from '../../../sections/payment-section/operations/payments/consts';

export type DataSetItemID = { id: string };

@UntilDestroy()
@Injectable()
export class ListService<T, R extends DataSetItemID> {
    list$: Observable<R[]> = this.cacheService.items$;
    isLoading$: Observable<boolean>;
    lastUpdated$: Observable<string> = this.fetchService.lastUpdated$;
    hasMore$: Observable<boolean> = this.fetchService.hasMore$;

    private innerLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private errorsService: ErrorService,
        private fetchService: IndicatorsPartialFetcher<R, T>,
        @Inject(SEARCH_LIMIT) private searchLimit: number,
        @Inject(PAYMENTS_UPDATE_DELAY_TOKEN) private updateDelay: number,
        public cacheService: ListCachingService<R>
    ) {
        this.initFetchedItemsCaching();
        this.initFetcherErrorsHandling();

        this.isLoading$ = this.innerLoading$.pipe(distinctUntilChanged());
    }

    search(data: T): void {
        this.startLoading();
        this.clearCache();
        this.fetchService.search(data);
    }

    refresh(): void {
        this.startLoading();
        this.clearCache();
        this.fetchService.refresh();
    }

    loadMore(): void {
        this.startLoading();
        this.fetchService.fetchMore();
    }

    protected scheduleUpdate(): Observable<void> {
        return of(null).pipe(delay(this.updateDelay));
    }

    private initFetchedItemsCaching(): void {
        this.fetchService.searchResult$
            .pipe(
                // last page - slice last searchLimit elements. Cache service won't update them on adding
                map((items: R[]) => this.getLastItemsPage(items)),
                untilDestroyed(this)
            )
            .subscribe((items: R[]) => {
                this.cacheService.addElements(...items);
                this.stopLoading();
            });
    }

    private initFetcherErrorsHandling(): void {
        this.fetchService.errors$.pipe(untilDestroyed(this)).subscribe((error: Error) => {
            this.errorsService.error(error);
            this.stopLoading();
        });
    }

    private getLastItemsPage(items: R[]): R[] {
        return items.slice(-this.searchLimit);
    }

    private clearCache(): void {
        this.cacheService.clear();
    }

    private startLoading(): void {
        this.innerLoading$.next(true);
    }

    private stopLoading(): void {
        this.innerLoading$.next(false);
    }
}
