import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { InitialDataService } from './initial-data.service';
import { StepName } from './step-flow';
import { StepFlowService } from './step-flow';
import { QuestionaryStateService } from './questionary-state.service';
import { SaveQuestionaryService } from './save-questionary';
import { SpinnerType } from '../../../spinner';
import { InitializeFormsService } from './forms';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss']
})
export class DataFlowComponent implements OnInit {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    stepFlow$ = this.stepFlowService.stepFlow$;
    activeStep$ = this.stepFlowService.activeStep$;

    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;
    isSaving$ = this.saveQuestionaryService.isSaving$;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initialDataService: InitialDataService,
        private saveQuestionaryService: SaveQuestionaryService,
        private questionaryStateService: QuestionaryStateService,
        private initializeFormsService: InitializeFormsService
    ) {}

    stepSelected(step: StepName) {
        this.questionaryStateService.save();
        this.stepFlowService.navigate(step);
    }

    ngOnInit() {
        this.route.params.pipe(pluck('claimID')).subscribe(claimID => this.initialDataService.initialize(claimID));
        this.initializeFormsService.initializeForms();
    }
}
