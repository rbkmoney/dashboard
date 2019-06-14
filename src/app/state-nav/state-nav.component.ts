import {
    Component,
    ContentChildren,
    QueryList,
    EventEmitter,
    Output,
    Input,
    HostBinding,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { StateNavItemComponent } from './state-nav-item';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StateNavComponent {
    _flat = false;
    @HostBinding('class.dsh-state-nav-flat')
    @Input()
    set flat(flat) {
        this._flat = flat !== false;
    }
    get flat() {
        return this._flat;
    }

    @Output()
    selectedIdxChange = new EventEmitter<number>();

    set selectedIdx(selectedIdx) {
        const selectedCount = this.items.toArray().filter(({ selected }) => selected).length;
        (selectedIdx === -1 ? this.items : this.items.filter(({}, idx) => idx !== selectedIdx)).forEach(
            item => (item.selected = false)
        );
        if (selectedCount > 1) {
            if (selectedIdx !== -1) {
                this.items.toArray()[selectedIdx].selected = true;
            }
            this.selectedIdxChange.next(selectedIdx);
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
            item.selected$.subscribe(selected => this.selectionManage(idx, selected))
        );
    }

    private selectionManage(changedIdx: number, selected: boolean) {
        if (selected) {
            this.selectedIdx = changedIdx;
        } else if (this.selectedIdx === changedIdx) {
            this.selectedIdx = -1;
        }
    }
}
