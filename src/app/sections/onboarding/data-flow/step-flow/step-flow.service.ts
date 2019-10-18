import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject, combineLatest } from 'rxjs';
import { shareReplay, startWith, pluck } from 'rxjs/operators';

import { toInitialStep } from './to-initial-step';
import { StepName } from './step-name';
import { InitialDataService } from '../initial-data.service';
import { handleNull, takeError } from '../../../../custom-operators';
import { mapToNavigateCommands } from './map-to-navigate-commands';
import { mapToStepFlow } from './map-to-step-flow';
import { mapDirectionToStep } from './map-direction-to-step';
import { mapToHasNext } from './map-to-has-next';
import { mapToHasPrevious } from './map-to-has-previous';

@Injectable()
export class StepFlowService {
    private navigate$: Subject<StepName> = new Subject();
    private goByDirection$: Subject<'forward' | 'back'> = new Subject();

    stepFlow$: Observable<StepName[]> = this.dataFlowService.initialSnapshot$.pipe(
        pluck('questionary'),
        mapToStepFlow,
        handleNull('Step flow initialization failed'),
        shareReplay(1)
    );

    activeStep$: Observable<StepName> = this.navigate$.pipe(
        startWith(toInitialStep(this.router.url)),
        handleNull('Active step calculation failed'),
        shareReplay(1)
    );

    hasNextStep$: Observable<boolean> = this.activeStep$.pipe(
        mapToHasNext(this.stepFlow$),
        shareReplay(1)
    );

    hasPreviousStep$: Observable<boolean> = this.activeStep$.pipe(
        mapToHasPrevious(this.stepFlow$),
        shareReplay(1)
    );

    constructor(
        private router: Router,
        private dataFlowService: InitialDataService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.navigate$
            .pipe(mapToNavigateCommands(this.router.url))
            .subscribe(commands => this.router.navigate(commands));
        this.goByDirection$
            .pipe(mapDirectionToStep(this.stepFlow$, this.activeStep$))
            .subscribe(step => this.navigate$.next(step));
        combineLatest(this.stepFlow$, this.activeStep$)
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    navigate(step: StepName) {
        this.navigate$.next(step);
    }

    go(direction: 'forward' | 'back') {
        this.goByDirection$.next(direction);
    }
}
