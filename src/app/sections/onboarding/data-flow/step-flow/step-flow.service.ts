import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject, combineLatest } from 'rxjs';
import { shareReplay, startWith } from 'rxjs/operators';

import { DataFlowService } from '../data-flow.service';
import { handleNull, takeError } from '../../../../custom-operators';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { toInitialStep } from './to-initial-step';
import { mapToStepFlow } from './map-to-step-flow';
import { StepName } from './step-name';

@Injectable()
export class StepFlowService {
    stepFlow$: Observable<StepName[]>;
    activeStep$: Observable<StepName>;

    private navigate$: Subject<StepName> = new Subject();

    constructor(private router: Router, private dataFlowService: DataFlowService, private snackBar: MatSnackBar) {
        this.stepFlow$ = this.dataFlowService.questionary$.pipe(
            mapToStepFlow,
            handleNull('Step flow initialization failed'),
            shareReplay(1)
        );
        const navigationState$ = this.navigate$.pipe(
            startWith(toInitialStep(this.router.url)),
            handleNull('Active step calculation failed'),
            shareReplay(1)
        );
        navigationState$
            .pipe(mapToNavigateCommands(this.router.url))
            .subscribe(commands => this.router.navigate(commands));
        this.activeStep$ = navigationState$;
        combineLatest(this.stepFlow$, this.activeStep$)
            .pipe(takeError)
            .subscribe(err => this.snackBar.open(err, 'OK'));
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }
}
