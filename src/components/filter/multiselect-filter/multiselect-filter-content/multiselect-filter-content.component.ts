import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, startWith, withLatestFrom } from 'rxjs/operators';

import { MultiselectFilterItem } from '../multiselect-filter-item';
import { MultiselectFilterService } from '../multiselect-filter.service';

@Component({
    selector: 'dsh-multiselect-filter-content',
    templateUrl: 'multiselect-filter-content.component.html',
    styleUrls: ['multiselect-filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterContentComponent<T = any> {
    @Input() label: string;

    @Output() selectedChange = new EventEmitter<MultiselectFilterItem<T>[]>();
    @Output() foundChange = new EventEmitter<MultiselectFilterItem<T>[]>();

    searchControl = this.fb.control('');

    items$ = this.multiselectFilterService.items$;
    currentSelectedItemsById$ = new BehaviorSubject<{ [N in MultiselectFilterItem<T>['id']]: boolean }>({});
    displayedItems$ = combineLatest([
        this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(250)) as Observable<
            string
        >,
        this.multiselectFilterService.items$,
    ]).pipe(
        withLatestFrom(this.currentSelectedItemsById$),
        map(([[search, items], selectedItems]) =>
            (items || []).filter(
                (item, idx) => selectedItems[item.id] || this.filterPredicate(search, item, idx, items)
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

    constructor(private fb: FormBuilder, private multiselectFilterService: MultiselectFilterService) {
        this.multiselectFilterService.selectedItemsById$.subscribe((selectedItemsById) =>
            this.currentSelectedItemsById$.next(selectedItemsById)
        );
    }

    clear() {
        this.searchControl.patchValue('');
        this.currentSelectedItemsById$.next({});
    }

    save() {
        this.multiselectFilterService.items$.subscribe((items) => {
            const { value: selectedItems } = this.currentSelectedItemsById$;
            this.searchControl.patchValue('');
            this.selectedChange.emit((items || []).filter(({ id }) => selectedItems[id]));
            this.multiselectFilterService.updateSelectedItemsById(selectedItems);
        });
    }

    toggle(id: MultiselectFilterItem<T>['id']) {
        const { value } = this.currentSelectedItemsById$;
        const newValue = { ...value };
        if (newValue[id]) {
            delete newValue[id];
        } else {
            newValue[id] = true;
        }
        this.currentSelectedItemsById$.next(newValue);
    }
}
