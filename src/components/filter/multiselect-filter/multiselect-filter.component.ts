import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { ComponentChanges } from '../../../type-utils';
import { MultiselectFilterItem } from './multiselect-filter-item';
import { MultiselectFilterService } from './multiselect-filter.service';

@Component({
    selector: 'dsh-multiselect-filter',
    templateUrl: 'multiselect-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MultiselectFilterService],
})
export class MultiselectFilterComponent<T = any> implements OnChanges {
    @Input() label: string;
    @Input() selectedLabel?: string;
    @Input() items: MultiselectFilterItem<T>[];
    @Input() selectedItems?: (MultiselectFilterItem<T> | MultiselectFilterItem<T>['id'])[];

    @Output() selectedChange = new EventEmitter<MultiselectFilterItem<T>[]>();

    selectedItems$ = this.multiselectFilterService.selectedItems$;
    title$ = this.selectedItems$.pipe(
        map((items) => {
            const { length } = items;
            if (length === 0) {
                return this.label;
            } else if (length <= 3) {
                return items.map(({ label }) => label).join(', ');
            }
            return `${this.selectedLabel} · ${length}`;
        }),
        shareReplay(1)
    );

    constructor(private multiselectFilterService: MultiselectFilterService<T>) {}

    ngOnChanges({ items, selectedItems }: ComponentChanges<MultiselectFilterComponent<T>>) {
        if (items && items.currentValue !== items.previousValue) {
            this.multiselectFilterService.updateItems(items.currentValue);
        }
        if (selectedItems && selectedItems.currentValue !== selectedItems.previousValue) {
            this.multiselectFilterService.updateSelectedItems(
                selectedItems.currentValue.map((i) => (typeof i === 'object' ? i.id : i))
            );
        }
    }
}
