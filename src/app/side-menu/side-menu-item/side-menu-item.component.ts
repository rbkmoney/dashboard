import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'dsh-side-menu-item',
    templateUrl: 'side-menu-item.component.html',
    styleUrls: ['side-menu-item.component.scss']
})
export class SideMenuItemComponent {
    @HostBinding('class.dsh-side-menu-item') root = true;

    private _selected = false;
    @HostBinding('class.dsh-side-menu-item-selected')
    @Input()
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected !== false;
    }
}
