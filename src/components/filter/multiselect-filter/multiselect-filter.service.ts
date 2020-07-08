import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MultiselectFilterItem } from './multiselect-filter-item';

@Injectable()
export class MultiselectFilterService<T = any> {
    private _items$ = new BehaviorSubject<MultiselectFilterItem<T>[]>([]);
    private _selectedItemsById$ = new BehaviorSubject<{ [N in MultiselectFilterItem<T>['id']]: boolean }>({});

    items$ = this._items$.pipe(shareReplay(1));
    selectedItemsById$ = this._selectedItemsById$.pipe(shareReplay(1));
    selectedItems$ = combineLatest([this.items$, this.selectedItemsById$]).pipe(
        map(([items, selectedItems]) => (items || []).filter(({ id }) => selectedItems[id])),
        shareReplay(1)
    );

    updateItems(items: MultiselectFilterItem<T>[]) {
        this._items$.next(items);
    }

    updateSelectedItems(ids: MultiselectFilterItem<T>['id'][]) {
        this._selectedItemsById$.next(Object.fromEntries(ids.map((id) => [id, true])));
    }

    updateSelectedItemsById(selectedItemsById: { [N in MultiselectFilterItem<T>['id']]: boolean }) {
        this._selectedItemsById$.next(selectedItemsById);
    }
}
