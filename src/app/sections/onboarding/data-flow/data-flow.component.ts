import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { InitialDataService } from './initial-data.service';
import { StepFlowService } from './step-flow';
import { SpinnerType } from '../../../spinner';
import { InitializeFormsService } from './forms';
import { SaveQuestionaryService } from './save-questionary';
import { QuestionaryStateService } from './questionary-state.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss']
})
export class DataFlowComponent implements OnInit, OnDestroy {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;
    // isSaving$ = this.saveQuestionaryService.isSaving$;
    activeStep$ = this.stepFlowService.activeStep$;

    private questionaryStateSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initialDataService: InitialDataService,
        private initializeFormsService: InitializeFormsService,
        private saveQuestionaryService: SaveQuestionaryService,
        private questionaryStateService: QuestionaryStateService
    ) {}

    ngOnInit() {
        this.route.params.pipe(pluck('claimID')).subscribe(claimID => this.initialDataService.initialize(claimID));
        this.initializeFormsService.initializeForms();
        this.stepFlowService.preserveDefault();
        this.questionaryStateSub = this.questionaryStateService.init();
    }

    ngOnDestroy() {
        this.initializeFormsService.unsubscribeForms();
        this.saveQuestionaryService.resetVersion();
        this.questionaryStateSub.unsubscribe();
    }
}
