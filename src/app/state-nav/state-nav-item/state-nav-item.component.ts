import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    set active(active: boolean | '') {
        if (active !== false) {
            this.select();
        }
    }

    @Input()
    validation: Validation | keyof typeof Validation;

    active$ = new BehaviorSubject(false);

    constructor() {}

    select() {
        this.active$.next(true);
    }

    unSelect() {
        this.active$.next(false);
    }
}
