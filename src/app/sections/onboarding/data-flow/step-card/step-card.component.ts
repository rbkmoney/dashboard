import { Component } from '@angular/core';

import { ValidityService } from '../validity';
import { StepCardService } from './step-card.service';

@Component({
    selector: 'dsh-step-card',
    templateUrl: 'step-card.component.html',
    providers: [StepCardService]
})
export class StepCardComponent {
    isFlowValid$ = this.validityService.isFlowValid$;
    stepNavInfo$ = this.stepCardService.stepNavInfo$;

    constructor(private validityService: ValidityService, private stepCardService: StepCardService) {}

    finishFormFlow() {
        this.stepCardService.finishFormFlow();
    }

    selectStepFlowIndex(index: number) {
        this.stepCardService.selectStepFlowIndex(index);
    }
}
