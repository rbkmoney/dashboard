import { Component, ContentChildren, QueryList, EventEmitter, Output, Input, HostBinding } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

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
    selectedIndexChange = new EventEmitter<number>();

    @ContentChildren(StateNavItemComponent)
    set items(items: QueryList<StateNavItemComponent>) {
        this.updateSelectionSubscriptions(items);
    }

    private selectionSubscriptions: Subscription[] = [];

    private updateSelectionSubscriptions(items: QueryList<StateNavItemComponent>) {
        while (this.selectionSubscriptions.length) {
            this.selectionSubscriptions.pop().unsubscribe();
        }
        this.selectionSubscriptions = items.map((item, idx) =>
            item.active$.pipe(filter(active => active)).subscribe(() => this.selectItem(idx, items))
        );
    }

    private selectItem(selectedIdx: number, items: QueryList<StateNavItemComponent>) {
        this.cleanSelections(selectedIdx, items);
        this.selectedIndexChange.next(selectedIdx);
    }

    private cleanSelections(selectedIdx: number, items: QueryList<StateNavItemComponent>) {
        items.filter((item, idx) => idx !== selectedIdx).forEach(item => item.unselect());
    }
}
