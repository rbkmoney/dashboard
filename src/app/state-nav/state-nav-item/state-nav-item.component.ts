import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { coerceBoolean } from '../../../utils';

export enum Color {
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
    @coerceBoolean
    selected = false;

    @Input()
    color: Color | keyof typeof Color;

    attemptToSelect$ = new Subject<boolean>();

    clickHandler(event: MouseEvent) {
        this.attemptToSelect$.next(true);
    }
}
