import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, startWith } from 'rxjs/operators';

import { ComponentChanges } from '../../../../type-utils';
import { MultiselectFilterItem } from '../multiselect-filter-item';

@Component({
    selector: 'dsh-multiselect-filter-content',
    templateUrl: 'multiselect-filter-content.component.html',
    styleUrls: ['multiselect-filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterContentComponent<T = any> implements OnChanges {
    @Input() label: string;
    @Input() items: MultiselectFilterItem<T>[];
    @Input() selectedItems?: (MultiselectFilterItem<T> | MultiselectFilterItem<T>['id'])[];

    @Output() selectedChange = new EventEmitter<MultiselectFilterItem<T>[]>();
    @Output() foundChange = new EventEmitter<MultiselectFilterItem<T>[]>();

    searchControl = this.fb.control('');

    items$ = new BehaviorSubject<MultiselectFilterItem<T>[]>([]);
    selectedItems$ = new BehaviorSubject<{ [N in MultiselectFilterItem<T>['id']]: boolean }>({});
    displayedItems$ = combineLatest([
        this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(250)) as Observable<
            string
        >,
        this.items$,
    ]).pipe(
        map(([search, items]) =>
            (items || []).filter(
                (item, idx) => this.selectedItems$.value[item.id] || this.filterPredicate(search, item, idx, items)
            )
        ),
        shareReplay(1)
    );

    @Input() filterPredicate: (
        search: string,
        item: MultiselectFilterItem<T>,
        idx: number,
        items: MultiselectFilterItem<T>[]
    ) => boolean = (value, item) => item.label.toLowerCase().trim().includes(value.toLowerCase().trim());

    constructor(private fb: FormBuilder) {}

    ngOnChanges({ items, selectedItems }: ComponentChanges<MultiselectFilterContentComponent<T>>) {
        if (items && items.currentValue !== items.previousValue) {
            this.items$.next(items.currentValue);
        }
        if (selectedItems && selectedItems.currentValue !== selectedItems.previousValue) {
            this.selectedItems$.next(
                Object.fromEntries(selectedItems.currentValue.map((i) => [typeof i === 'object' ? i.id : i, true]))
            );
        }
    }

    clear() {
        this.searchControl.patchValue('');
        this.selectedItems$.next({});
    }

    save() {
        if (this.items) {
            this.searchControl.patchValue('');
            this.selectedChange.emit(this.items.filter(({ id }) => this.selectedItems$.value[id]));
        }
    }

    toggle(id: MultiselectFilterItem<T>['id']) {
        this.selectedItems$.next({ ...this.selectedItems$.value, [id]: !this.selectedItems$.value[id] });
        console.log(this.selectedItems$.value);
    }
}
