import { Component, HostBinding, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { SideMenuItemComponent } from './side-menu-item';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'dsh-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent {
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    @ContentChildren(SideMenuItemComponent)
    set items(items: QueryList<SideMenuItemComponent>) {
        this.updateSelectionSubscriptions(items);
    }

    @HostBinding('class.dsh-side-menu') private root = true;

    private selectionSubscriptions: Subscription[] = [];

    private updateSelectionSubscriptions(items: QueryList<SideMenuItemComponent>) {
        while (this.selectionSubscriptions.length) {
            this.selectionSubscriptions.pop().unsubscribe();
        }
        this.selectionSubscriptions = items.map((item, idx) =>
            item.active$.pipe(filter(active => active)).subscribe(() => this.selectItem(idx, items))
        );
    }

    private selectItem(selectedIdx: number, items: QueryList<SideMenuItemComponent>) {
        this.cleanSelections(selectedIdx, items);
        this.selectedIndexChange.next(selectedIdx);
    }

    private cleanSelections(selectedIdx: number, items: QueryList<SideMenuItemComponent>) {
        items.filter((item, idx) => idx !== selectedIdx).forEach(item => (item.active = false));
    }
}
