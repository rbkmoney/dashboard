import { ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';

import { coerceBoolean } from '../../../../utils/coerce';
import { Step, StepperItemComponent } from '../vertical-stepper/stepper-item/stepper-item.component';

export class Stepper {
    @Input()
    @coerceBoolean
    autoselect = false;

    @Output()
    selectedIdxChange = new EventEmitter<number>();

    @Input()
    steps: Step[];

    @Input()
    selectedItem: Step;

    set selectedIdx(nextSelectedIdx) {
        if (nextSelectedIdx !== this.selectedIdx) {
            if (this.autoselect) {
                this.items[this.selectedIdx] = false;
                this.items.forEach((item, idx) => {
                    item.selected = idx === nextSelectedIdx;
                });
            }
            this.selectedIdxChange.next(nextSelectedIdx);
        }
    }
    get selectedIdx() {
        return this.items.toArray().findIndex(({ selected }) => selected);
    }

    private _items: QueryList<StepperItemComponent>;
    @ViewChildren(StepperItemComponent)
    set items(items) {
        this._items = items;
        this.updateSelectionSubscriptions(items);
    }
    get items() {
        return this._items;
    }

    private selectionSubscriptions: Subscription[] = [];

    private updateSelectionSubscriptions(items: QueryList<StepperItemComponent>) {
        while (this.selectionSubscriptions.length) {
            this.selectionSubscriptions.pop().unsubscribe();
        }
        this.selectionSubscriptions = items.map((item, idx) =>
            item.attemptToSelect$.subscribe(() => (this.selectedIdx = idx))
        );
    }
}
