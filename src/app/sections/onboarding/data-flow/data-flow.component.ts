import { Component } from '@angular/core';

import { InitialDataService } from './initial-data.service';
import { StepName } from './step-flow';
import { StepFlowService } from './step-flow';
import { QuestionaryStateService } from './questionary-state.service';
import { ValidityService } from './validity.service';
import { SaveQuestionaryService } from './save-questionary';
import { SpinnerType } from '../../../spinner';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [InitialDataService, StepFlowService, QuestionaryStateService, ValidityService, SaveQuestionaryService]
})
export class DataFlowComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    stepFlow$ = this.stepFlowService.stepFlow$;
    activeStep$ = this.stepFlowService.activeStep$;

    initialized$ = this.dataFlowService.initialized$;
    initializeError$ = this.dataFlowService.initializeError$;
    isSaving$ = this.saveQuestionaryService.isSaving$;

    constructor(
        private stepFlowService: StepFlowService,
        private dataFlowService: InitialDataService,
        private saveQuestionaryService: SaveQuestionaryService,
        private questionaryStateService: QuestionaryStateService
    ) {}

    stepSelected(step: StepName) {
        this.questionaryStateService.save();
        this.stepFlowService.navigate(step);
    }
}
