import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { InitialDataService } from './initial-data.service';
import { StepFlowService } from './step-flow';
import { InitializeFormsService } from './forms';
import { QuestionaryStateService } from './questionary-state.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss']
})
export class DataFlowComponent implements OnInit, OnDestroy {
    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;
    activeStep$ = this.stepFlowService.activeStep$;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initialDataService: InitialDataService,
        private initializeFormsService: InitializeFormsService,
        private questionaryStateService: QuestionaryStateService
    ) {}

    ngOnInit() {
        this.initializeFormsService.initializeForms();
        this.stepFlowService.initialize();
        this.stepFlowService.preserveDefault();
        this.route.params.pipe(pluck('claimID')).subscribe(claimID => this.initialDataService.setClaimID(claimID));
    }

    ngOnDestroy() {
        this.initializeFormsService.unsubscribeForms();
        this.stepFlowService.unsubscribe();
        this.questionaryStateService.resetState();
    }
}
