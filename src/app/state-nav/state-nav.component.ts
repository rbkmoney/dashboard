import { Component, ContentChildren, QueryList, EventEmitter, Output, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateNavItemComponent } from './state-nav-item';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss']
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

    set selectedIdx(idx) {
        if (this.selectedIdx !== idx) {
            const selectedItem = this.items.toArray()[idx];
            this.items.filter(item => item !== selectedItem).forEach(item => (item.selected = false));
            this.selectedIdxChange.next(idx);
        }
    }
    get selectedIdx() {
        return this.items.toArray().findIndex(item => item.selected);
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
            this.items.toArray()[changedIdx].selected = false;
            this.selectedIdx = -1;
        }
    }
}
