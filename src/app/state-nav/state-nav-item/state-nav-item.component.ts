import { Component, Input, EventEmitter } from '@angular/core';
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

    @Input()
    click = new EventEmitter<MouseEvent>();

    active$ = new BehaviorSubject(false);

    constructor() {}

    clickHandler(event: MouseEvent) {
        this.click.next(event);
        this.select();
    }

    select() {
        this.active$.next(true);
    }

    unSelect() {
        this.active$.next(false);
    }
}
