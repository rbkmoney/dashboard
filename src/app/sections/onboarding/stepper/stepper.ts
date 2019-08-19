import { EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { coerceBoolean } from '../../../../utils/coerce';
import { Step, StepperItemComponent } from './stepper-item/stepper-item.component';

export class Stepper {
    constructor(private router: Router) {}

    set selectedIdx(nextSelectedIdx: number) {
        if (nextSelectedIdx !== this.selectedIdx) {
            this.selectedIdxChange.next(nextSelectedIdx);
            this.router.navigate([this.steps[nextSelectedIdx].url]);
        }
    }

    get selectedIdx() {
        if (this._items) {
            return this._items.toArray().findIndex(({ item: { url } }) => this.router.url === url);
        }
    }

    @ViewChildren(StepperItemComponent)
    set items(items) {
        this._items = items;
        this.updateSelectionSubscriptions(items);
    }

    get items() {
        return this._items;
    }

    @Input()
    @coerceBoolean
    autoselect = false;

    @Output()
    selectedIdxChange = new EventEmitter<number>();

    @Input()
    steps: Step[];

    // @Input()
    // selectedItem: Step;

    private _items: QueryList<StepperItemComponent>;

    private selectionSubscriptions: Subscription[] = [];

    next() {
        if (this.selectedIdx !== this.items.length - 1) {
            this.selectedIdx = this.selectedIdx + 1;
        }
    }

    previous() {
        console.log(this.selectedIdx);
        if (this.selectedIdx !== 0) {
            this.selectedIdx = this.selectedIdx - 1;
        }
    }

    isSelected(i: number): boolean {
        return this.selectedIdx === i;
    }

    private updateSelectionSubscriptions(items: QueryList<StepperItemComponent>) {
        while (this.selectionSubscriptions.length) {
            this.selectionSubscriptions.pop().unsubscribe();
        }
        this.selectionSubscriptions = items.map((item, idx) =>
            item.attemptToSelect$.subscribe(() => (this.selectedIdx = idx))
        );
    }
}
