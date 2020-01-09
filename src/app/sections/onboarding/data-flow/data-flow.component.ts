import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { SnapshotService } from './initial-data.service';
import { StepFlowService } from './step-flow';
import { InitializeFormsService } from './forms';
import { QuestionaryStateService } from './questionary-state.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss']
})
export class DataFlowComponent implements OnInit, OnDestroy {
    isLoading$ = this.initialDataService.isLoading$;
    error$ = this.initialDataService.error$;
    activeStep$ = this.stepFlowService.activeStep$;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initialDataService: SnapshotService,
        private initializeFormsService: InitializeFormsService,
        private questionaryStateService: QuestionaryStateService
    ) {}

    ngOnInit() {
        this.initializeFormsService.initializeForms();
        this.stepFlowService.initialize();
        this.stepFlowService.preserveDefault();
        this.route.params
            .pipe(pluck('documentID'))
            .subscribe(documentID => this.initialDataService.receive(documentID));
    }

    ngOnDestroy() {
        this.initializeFormsService.unsubscribeForms();
        this.stepFlowService.unsubscribe();
        this.questionaryStateService.resetState();
    }
}
