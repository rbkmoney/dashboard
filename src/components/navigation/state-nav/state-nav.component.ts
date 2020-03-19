import {
    Component,
    ContentChildren,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { coerceBoolean } from '../../../utils';
import { StateNavItemComponent } from './state-nav-item';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StateNavComponent {
    @HostBinding('class.dsh-state-nav-flat')
    @Input()
    @coerceBoolean
    flat = false;

    @Input()
    @coerceBoolean
    autoselect = false;

    @Output()
    selectedIdxChange = new EventEmitter<number>();

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

    private _items: QueryList<StateNavItemComponent>;
    @ContentChildren(StateNavItemComponent)
    set items(items) {
        this._items = items;
        this.updateSelectionSubscriptions(items);
    }
    get items() {
        return this._items;
    }

    private selectionSubscriptions: Subscription[] = [];

    private updateSelectionSubscriptions(items: QueryList<StateNavItemComponent>) {
        while (this.selectionSubscriptions.length) {
            this.selectionSubscriptions.pop().unsubscribe();
        }
        this.selectionSubscriptions = items.map((item, idx) =>
            item.attemptToSelect$.subscribe(() => (this.selectedIdx = idx))
        );
    }
}
