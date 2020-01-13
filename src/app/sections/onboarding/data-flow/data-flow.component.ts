import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { StepFlowService } from './step-flow';
import { InitializeFormsService } from './forms';
import { QuestionaryStateService } from './questionary-state.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss']
})
export class DataFlowComponent implements OnInit, OnDestroy {
    activeStep$ = this.stepFlowService.activeStep$;

    questionaryData$ = this.questionaryStateService.questionaryData$;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initializeFormsService: InitializeFormsService,
        private questionaryStateService: QuestionaryStateService
    ) {}

    ngOnInit() {
        this.initializeFormsService.initializeForms();
        this.route.params
            .pipe(pluck('documentID'))
            .subscribe(documentID => this.questionaryStateService.init(documentID));
    }

    ngOnDestroy() {
        this.initializeFormsService.unsubscribeForms();
        this.questionaryStateService.reset();
    }
}
