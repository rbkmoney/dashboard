import { Component } from '@angular/core';

import { DataFlowService } from './data-flow.service';
import { StepName } from './step-flows';
import { StepFlowService } from './step-flow.service';
import { QuestionaryService } from './questionary.service';
import { ValidityService } from './validity.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [DataFlowService, StepFlowService, QuestionaryService, ValidityService]
})
export class DataFlowComponent {
    stepFlow$ = this.stepFlowService.stepFlow$;
    activeStep$ = this.stepFlowService.activeStep$;

    constructor(private stepFlowService: StepFlowService) {}

    stepSelected(step: StepName) {
        this.stepFlowService.navigate(step);
    }
}
