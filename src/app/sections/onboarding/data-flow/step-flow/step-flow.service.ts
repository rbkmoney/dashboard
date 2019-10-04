import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

import { DataFlowService } from '../data-flow.service';
import { handleNull, takeError } from '../../../../custom-operators';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { toInitialStep } from './to-initial-step';
import { mapToStepFlow } from './map-to-step-flow';
import { StepName } from './step-name';

@Injectable()
export class StepFlowService {
    private navigate$: Subject<StepName> = new Subject();
    private activeStepState$: Subject<StepName | null> = new BehaviorSubject(toInitialStep(this.router.url));

    stepFlow$: Observable<StepName[]>;
    activeStep$: Observable<StepName> = this.activeStepState$.pipe(
        handleNull('Active step calculation failed'),
        filter(s => s !== null)
    );

    constructor(private router: Router, private dataFlowService: DataFlowService, private snackBar: MatSnackBar) {
        this.stepFlow$ = this.dataFlowService.questionary$.pipe(
            mapToStepFlow,
            handleNull('Step flow initialization failed'),
            filter(s => s !== null),
            shareReplay(1)
        );
        this.navigate$
            .pipe(mapToNavigateCommands(this.router.url))
            .subscribe(({ commands, step }) =>
                this.router.navigate(commands).then(() => this.activeStepState$.next(step))
            );
        combineLatest(this.stepFlow$, this.activeStep$)
            .pipe(takeError)
            .subscribe(err => this.snackBar.open(err, 'OK'));
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }
}
