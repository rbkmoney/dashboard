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

    displayedLabels$ = new BehaviorSubject<string[]>([]);

    title$ = this.displayedLabels$.pipe(
        map((labels) => {
            const { length } = labels;
            if (length === 0) {
                return this.label;
            } else if (length <= 3) {
                return labels.join(', ');
            }
            return `${this.selectedLabel} · ${length}`;
        }),
        shareReplay(1)
    );

    selectedItemsChange(items: Item[]) {
        this.selectedChange.emit(items);
        this.displayedLabels$.next(items.map(({ label }) => label));
    }
}
