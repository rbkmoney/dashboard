import { Component, ContentChildren, QueryList, EventEmitter, Output } from '@angular/core';

import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

export interface SelectEvent {
    idx: number;
    item: StateNavItemComponent;
    items: QueryList<StateNavItemComponent>;
}

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss']
})
export class StateNavComponent {
    @Output()
    select = new EventEmitter<SelectEvent>();

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

    private selectItem(selectedItem: StateNavItemComponent) {
        this.items.filter(i => i !== selectedItem).forEach(item => item.unSelect());
        this.select.next({
            idx: this.items.toArray().findIndex(i => i === selectedItem),
            item: selectedItem,
            items: this.items
        });
    }
}
