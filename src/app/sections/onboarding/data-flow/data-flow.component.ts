import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { InitialDataService } from './initial-data.service';
import { StepFlowService } from './step-flow';
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

    initialized$ = this.initialDataService.initialized$;
    initializeError$ = this.initialDataService.initializeError$;
    isSaving$ = this.saveQuestionaryService.isSaving$;
    activeStep$ = this.stepFlowService.activeStep$;

    constructor(
        private route: ActivatedRoute,
        private stepFlowService: StepFlowService,
        private initialDataService: InitialDataService,
        private saveQuestionaryService: SaveQuestionaryService,
        private initializeFormsService: InitializeFormsService
    ) {}

    ngOnInit() {
        this.route.params.pipe(pluck('claimID')).subscribe(claimID => this.initialDataService.initialize(claimID));
        this.initializeFormsService.initializeForms();
        this.stepFlowService.preserveDefault();
    }
}
