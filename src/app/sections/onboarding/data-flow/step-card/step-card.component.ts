import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepName } from '../step-flow';
import { ValidityService } from '../validity.service';

@Component({
    selector: 'dsh-step-card',
    templateUrl: 'step-card.component.html'
})
export class StepCardComponent {
    @Input() stepFlow: StepName[];
    @Input() activeStep: StepName;
    @Output() stepSelected = new EventEmitter<StepName>();

    @Input() actionDisabled = true;
    @Output() doAction = new EventEmitter<void>();

    constructor(private validityService: ValidityService) {}

    getStepStatus(step: StepName): Observable<'success' | null> {
        return this.validityService.isValid(step).pipe(map(isValid => (isValid ? 'success' : null)));
    }

    selectStepFlowIndex(index: number) {
        this.stepSelected.emit(this.stepFlow[index]);
    }
}
