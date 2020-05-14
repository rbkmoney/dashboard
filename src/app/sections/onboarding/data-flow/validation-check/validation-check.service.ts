import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { combineLatest, merge, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { first, map, pairwise, pluck, scan, switchMap, take, tap } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { validationCheckControl } from './validation-check-control';

export type ValiditionCheckSteps = Map<StepName, AbstractControl>;

@Injectable()
export class ValidationCheckService {
    private setUpFormControls$ = new Subject<[StepName, AbstractControl]>();
    private sub = Subscription.EMPTY;
    private steps$ = new ReplaySubject<ValiditionCheckSteps>(1);

    constructor(private stepFlowService: StepFlowService) {}

    setUpFormControl(step: StepName, control: AbstractControl) {
        this.setUpFormControls$.next([step, control]);
    }

    validationCheckCurrentStep() {
        this.stepFlowService.activeStep$.pipe(take(1)).subscribe(step => this.validationCheckByStep(step));
    }

    subscribe() {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(
            map(stepFlow => new Map(stepFlow.map(stepName => [stepName, undefined]))),
            first()
        );
        this.sub = merge(
            combineLatest([this.setUpFormControls$, initialSteps$]).pipe(
                switchMap(([validityContext, initialSteps]) =>
                    of(validityContext).pipe(
                        scan((acc, [step, control]) => (acc.has(step) ? acc.set(step, control) : acc), initialSteps)
                    )
                ),
                tap(s => this.steps$.next(s))
            ),
            this.stepFlowService.activeStep$.pipe(
                pairwise(),
                pluck(0),
                tap(step => this.validationCheckByStep(step))
            )
        ).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    private validationCheckByStep(step: StepName) {
        this.steps$
            .pipe(
                take(1),
                map(steps => steps.get(step))
            )
            .subscribe(validationCheckControl);
    }
}
