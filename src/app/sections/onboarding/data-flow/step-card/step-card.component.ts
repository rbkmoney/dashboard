import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepName, StepFlowService } from '../step-flow';
import { ValidityService } from '../validity';
import { StepCardService } from './step-card.service';

@Component({
    selector: 'dsh-step-card',
    templateUrl: 'step-card.component.html',
    providers: [StepCardService]
})
export class StepCardComponent {
    stepFlow$ = this.stepFlowService.stepFlow$;
    activeStep$ = this.stepFlowService.activeStep$;
    isFlowValid$ = this.validityService.isFlowValid$;

    constructor(
        private validityService: ValidityService,
        private stepFlowService: StepFlowService,
        private stepCardService: StepCardService
    ) {}

    getStepStatus(step: StepName): Observable<string | null> {
        return this.isStepValid(step).pipe(map(isValid => (isValid ? 'success' : null)));
    }

    isStepValid(step: StepName): Observable<boolean> {
        return this.validityService.isValid(step);
    }

    finishFormFlow() {
        this.stepCardService.finishFormFlow();
    }

    selectStepFlowIndex(index: number) {
        this.stepCardService.selectStepFlowIndex(index);
    }
}
