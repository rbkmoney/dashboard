import { Component, ContentChildren, QueryList, EventEmitter, Output } from '@angular/core';

import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss']
})
export class StateNavComponent {
    @Output()
    select = new EventEmitter<{ idx: number; item: StateNavItemComponent; items: QueryList<StateNavItemComponent> }>();

    private _items: QueryList<StateNavItemComponent>;
    @ContentChildren(StateNavItemComponent)
    set items(items: QueryList<StateNavItemComponent>) {
        this._items = items;
        for (const item of items.toArray()) {
            item.active$.subscribe(active => {
                if (active) {
                    this.selectItem(item);
                }
            });
        }
    }
    get items() {
        return this._items;
    }

    constructor() {}

    private selectItem(selectedItem: StateNavItemComponent) {
        for (const item of this.items.toArray().filter(i => i !== selectedItem)) {
            item.unSelect();
        }
        this.select.next({
            idx: this.items.toArray().findIndex(i => i === selectedItem),
            item: selectedItem,
            items: this.items
        });
    }
}
