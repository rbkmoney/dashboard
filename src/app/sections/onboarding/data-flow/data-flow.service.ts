import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { InitializeFormsService } from './forms';
import { QuestionaryStateService } from './questionary-state.service';
import { StepFlowService } from './step-flow';
import { ValidationCheckService } from './validation-check';
import { ValidityService } from './validity';

@Injectable()
export class DataFlowService {
    private sub: Subscription = Subscription.EMPTY;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initializeFormsService: InitializeFormsService,
        private questionaryStateService: QuestionaryStateService,
        private validityService: ValidityService,
        private validationCheckService: ValidationCheckService
    ) {}

    init() {
        this.questionaryStateService.subscribe();
        this.stepFlowService.subscribe();
        this.validityService.subscribe();
        this.validationCheckService.subscribe();
        this.initializeFormsService.subscribe();
        this.sub = this.route.params
            .pipe(pluck('documentID'))
            .subscribe(documentID => this.questionaryStateService.receiveSnapshot(documentID));
    }

    destroy() {
        this.sub.unsubscribe();
        this.initializeFormsService.unsubscribe();
        this.questionaryStateService.unsubscribe();
        this.validityService.unsubscribe();
        this.validationCheckService.unsubscribe();
        this.stepFlowService.unsubscribe();
        this.questionaryStateService.reset();
    }
}
