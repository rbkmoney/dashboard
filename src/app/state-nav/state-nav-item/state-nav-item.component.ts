import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-state-nav-item',
    templateUrl: 'state-nav-item.component.html',
    styleUrls: ['state-nav-item.comonent.scss']
})
export class StateNavItemComponent {
    @Input()
    active = false;

    @Input()
    success = false;

    @Input()
    warn = false;

    constructor() {}

    select() {
        this.active = true;
    }
}
