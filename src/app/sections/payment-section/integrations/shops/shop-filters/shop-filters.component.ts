import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

import { ShopsFiltersStoreService } from '../services/shops-filters-store/shops-filters-store.service';
import { ShopFiltersData } from '../types/shop-filters-data';

const DEFAULT_FILTERS: ShopFiltersData = {
    query: '',
};

@Component({
    selector: 'dsh-shop-filters',
    templateUrl: './shop-filters.component.html',
})
export class ShopFiltersComponent implements OnInit, OnDestroy {
    @Output() destroy = new EventEmitter<void>();

    filtersData$: Observable<ShopFiltersData>;

    protected filtersChange$ = new Subject<Partial<ShopFiltersData>>();

    constructor(private filtersStore: ShopsFiltersStoreService) {}

    ngOnInit(): void {
        this.filtersData$ = this.filtersStore.data$.pipe(
            map((storeData: Partial<ShopFiltersData>) => {
                return {
                    ...DEFAULT_FILTERS,
                    ...storeData,
                };
            })
        );

        this.filtersChange$
            .pipe(withLatestFrom(this.filtersData$), takeUntil(this.destroy))
            .subscribe(([changedData, curData]: [Partial<ShopFiltersData>, ShopFiltersData]) => {
                this.filtersStore.preserve({
                    ...curData,
                    ...changedData,
                });
            });
    }

    ngOnDestroy(): void {
        this.destroy.emit();
    }

    onQueryChanged(query: string): void {
        this.updateFilters({
            query,
        });
    }

    protected updateFilters(data: Partial<ShopFiltersData>): void {
        this.filtersChange$.next({
            ...data,
        });
    }
}
