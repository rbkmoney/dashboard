import { Component, OnDestroy, OnInit } from '@angular/core';

import { ClaimService } from './claim/claim.service';
import { DataFlowService } from './data-flow.service';
import { InitializeFormsService, UploadDocumentsService } from './forms';
import { QuestionaryStateService } from './questionary-state.service';
import { StepFlowService } from './step-flow';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [DataFlowService, ClaimService, InitializeFormsService, UploadDocumentsService],
})
export class DataFlowComponent implements OnInit, OnDestroy {
    activeStep$ = this.stepFlowService.activeStep$;
    questionaryData$ = this.questionaryStateService.questionaryData$;
    isLoading$ = this.questionaryStateService.isLoading$;

    constructor(
        private stepFlowService: StepFlowService,
        private questionaryStateService: QuestionaryStateService,
        private dataFlowService: DataFlowService
    ) {}

    ngOnInit() {
        this.dataFlowService.init();
    }

    ngOnDestroy() {
        this.dataFlowService.destroy();
    }
}
