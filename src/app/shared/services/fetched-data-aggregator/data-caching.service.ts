import { untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { CachedItem, DataSetItemStrID } from '../../models';

export class DataCachingService<R extends DataSetItemStrID> {
    protected get cachedItems(): R[] {
        return this.itemsList$.value;
    }

    constructor() {
        this.items$ = this.itemsList$.asObservable();
        this.initUpdatesListener();
    }

    items$: Observable<R[] | null>;

    protected itemsMap = new Map<string, CachedItem<R>>();
    protected itemsList$ = new BehaviorSubject<R[]>([]);
    protected cacheUpdates$ = new ReplaySubject<R[]>(1);

    addElements(...items: R[]): void {
        this.addToCache(items);
    }

    updateElements(...items: R[]): void {
        this.cacheUpdates$.next(items);
    }

    clear(): void {
        this.clearCache();
    }

    private initUpdatesListener(): void {
        this.cacheUpdates$.pipe(untilDestroyed(this)).subscribe((updatedList: R[]) => {
            this.updateCacheList(updatedList);
        });
    }

    private addToCache(list: R[]): void {
        const currentList = this.cachedItems;
        const newItemsList = this.filterCachedElements(list);
        this.itemsList$.next([...currentList, ...newItemsList]);
        this.updateCacheMap();
    }

    protected updateCacheList(list: R[]): void {
        // to not mutate cached data we should make a shallow copy
        const itemsList = this.cachedItems.slice();

        list.forEach((item: R) => {
            const { id } = item;

            if (!this.itemsMap.has(id)) {
                return;
            }

            const { listIndex } = this.itemsMap.get(id);
            itemsList.splice(listIndex, 1, item);
        });

        this.itemsList$.next(itemsList);
        this.updateCacheMap();
    }

    protected updateCacheMap(): void {
        this.cachedItems.forEach((item: R, listIndex: number) => {
            this.itemsMap.set(item.id, {
                item,
                listIndex,
            });
        });
    }

    protected filterCachedElements(list: R[]): R[] {
        return list.filter((item: R) => {
            const { id } = item;
            return !this.itemsMap.has(id);
        });
    }

    private clearCache(): void {
        this.itemsList$.next([]);
        this.itemsMap.clear();
    }
}
