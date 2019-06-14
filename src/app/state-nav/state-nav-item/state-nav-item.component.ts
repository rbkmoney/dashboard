import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    selected$ = new BehaviorSubject<boolean>(false);
    @Input()
    set selected(selected) {
        selected = selected !== false;
        if (selected !== this.selected) {
            this.selected$.next(selected);
        }
    }
    get selected() {
        return this.selected$.value;
    }

    @Input()
    color: Color | keyof typeof Color;

    clickHandler(event: MouseEvent) {
        this.selected = true;
    }
}
