import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { combineLatest, merge, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, pairwise, pluck, scan, switchMap, take, tap } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { validationCheckControl } from './validation-check-control';

export type ValidationCheckSteps = Map<StepName, AbstractControl>;

@Injectable()
export class ValidationCheckService {
    private setUpFormControls$ = new ReplaySubject<[StepName, AbstractControl]>();
    private sub = Subscription.EMPTY;
    private steps$ = new ReplaySubject<ValidationCheckSteps>(1);
    private validationCheckStep$ = new Subject<StepName | undefined>();

    constructor(private stepFlowService: StepFlowService) {}

    setUpFormControl(step: StepName, control: AbstractControl) {
        this.setUpFormControls$.next([step, control]);
    }

    validationCheck(step?: StepName) {
        this.validationCheckStep$.next(step);
    }

    subscribe() {
        this.sub = merge(
            this.stepFlowService.stepFlow$.pipe(
                map(stepFlow => new Map(stepFlow.map(stepName => [stepName, undefined]))),
                take(1),
                switchMap(initialSteps =>
                    this.setUpFormControls$.pipe(
                        scan((acc, [step, control]) => (acc.has(step) ? acc.set(step, control) : acc), initialSteps)
                    )
                ),
                tap(s => this.steps$.next(s))
            ),
            this.validationCheckStep$.pipe(
                switchMap(step =>
                    combineLatest([this.steps$, step ? of(step) : this.stepFlowService.activeStep$.pipe(take(1))])
                ),
                map(([steps, step]) => steps.get(step)),
                tap(validationCheckControl)
            ),
            this.stepFlowService.activeStep$.pipe(
                pairwise(),
                pluck(0),
                tap(step => this.validationCheck(step))
            )
        ).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }
}
