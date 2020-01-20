import { Component, OnInit, OnDestroy } from '@angular/core';

import { StepFlowService } from './step-flow';
import { QuestionaryStateService } from './questionary-state.service';
import { DataFlowService } from './data-flow.service';

@Component({
    selector: 'dsh-data-flow',
    templateUrl: 'data-flow.component.html',
    styleUrls: ['data-flow.component.scss'],
    providers: [DataFlowService]
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
