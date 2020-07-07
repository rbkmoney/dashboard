import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Item } from './multiselect-filter-content';

@Component({
    selector: 'dsh-multiselect-filter',
    templateUrl: 'multiselect-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectFilterComponent {
    @Input() label: string;
    @Input() selectedLabel?: string;

    @Input() items: Item[] = [];

    @Output() selectedChange = new EventEmitter<Item[]>();

    displayedItems$ = new BehaviorSubject<string[]>([]);
    displayedItemsStr$ = this.displayedItems$.pipe(
        map((labels) => labels.join(', ')),
        shareReplay(1)
    );

    selectedItemsChange(items: Item[]) {
        this.selectedChange.emit(items);
        this.displayedItems$.next(items.map(({ label }) => label));
    }
}
