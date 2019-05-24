import { Component, ContentChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss']
})
export class StateNavComponent {
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

    private selectItem(idx: number, items: QueryList<StateNavItemComponent>) {
        this.cleanSelections(idx, items);
        this.selectedIndexChange.next(idx);
    }

    private cleanSelections(idx: number, items: QueryList<StateNavItemComponent>) {
        items.filter(item => item !== items.toArray()[idx]).forEach(item => item.unselect());
    }
}
