import { Component, Input } from '@angular/core';

export enum Validation {
    success = 'success',
    warn = 'warn'
}

@Component({
    selector: 'dsh-state-nav-item',
    templateUrl: 'state-nav-item.component.html',
    styleUrls: ['state-nav-item.comonent.scss']
})
export class StateNavItemComponent {
    @Input()
    active = false;

    @Input()
    validation: Validation | keyof typeof Validation;

    constructor() {}

    select() {
        this.active = true;
    }
}
