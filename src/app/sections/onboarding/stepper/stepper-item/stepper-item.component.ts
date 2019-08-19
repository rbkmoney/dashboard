import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { coerceBoolean } from '../../../../../utils/coerce';

export interface Step {
    url: string;
    title: string;
    status?: 'success' | 'warning';
}

@Component({
    selector: 'dsh-stepper-item',
    templateUrl: 'stepper-item.component.html',
    styleUrls: ['../vertical-stepper/vertical-stepper.component.scss']
})
export class StepperItemComponent {
    @Input()
    @coerceBoolean
    selected = false;

    @Input()
    item: Step;

    attemptToSelect$ = new Subject<boolean>();

    clickHandler() {
        this.attemptToSelect$.next(true);
    }
}
