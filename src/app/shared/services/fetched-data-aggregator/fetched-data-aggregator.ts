import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

import { DEFAULT_SEARCH_LIMIT, DEFAULT_UPDATE_DELAY_TOKEN } from '@dsh/app/sections/tokens';

import { IndicatorsPartialFetcher } from '../../../sections/partial-fetcher';
import { DataSetItemStrID } from '../../models';
import { ErrorService } from '../error';
import { DataCachingService } from './data-caching.service';

@UntilDestroy()
@Injectable()
export class FetchedDataAggregator<T, R extends DataSetItemStrID> {
    data$: Observable<R[]>;
    isLoading$: Observable<boolean>;
    lastUpdated$: Observable<string> = this.fetchService.lastUpdated$;
    hasMore$: Observable<boolean> = this.fetchService.hasMore$;
    cacheService: DataCachingService<R>;

    private innerLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private errorsService: ErrorService,
        private fetchService: IndicatorsPartialFetcher<R, T>,
        @Inject(DEFAULT_SEARCH_LIMIT) private searchLimit: number,
        @Inject(DEFAULT_UPDATE_DELAY_TOKEN) private updateDelay: number
    ) {
        this.initFetchedItemsCaching();
        this.initFetcherErrorsHandling();

        this.cacheService = new DataCachingService();
        this.data$ = this.cacheService.items$;
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
