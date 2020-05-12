import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { first, map, pluck, scan, shareReplay, switchMap, take } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { mapToInitialValiditySteps } from './map-to-initial-validity-steps';
import { mapToIsFlowValid } from './map-to-is-flow-valid';
import { ValidateFn, ValiditySteps } from './validity-steps';

@Injectable()
export class ValidityService {
    private setUpValidity$ = new Subject<{ step: StepName; isValid: boolean; validate: ValidateFn }>();
    private steps$ = new ReplaySubject<ValiditySteps>(1);
    private sub: Subscription = Subscription.EMPTY;
    private currentStep$ = combineLatest([this.stepFlowService.activeStep$, this.steps$]).pipe(
        map(([activeStep, validitySteps]) => validitySteps.get(activeStep)),
        shareReplay(1)
    );

    validitySteps$: Observable<ValiditySteps> = this.steps$.asObservable();
    isFlowValid$: Observable<boolean> = this.validitySteps$.pipe(mapToIsFlowValid, shareReplay(1));
    isCurrentStepValid$: Observable<boolean> = this.currentStep$.pipe(pluck('isValid'), shareReplay(1));

    constructor(private stepFlowService: StepFlowService) {}

    subscribe() {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(mapToInitialValiditySteps, first());
        this.sub = combineLatest([this.setUpValidity$, initialSteps$])
            .pipe(
                switchMap(([validityContext, initialSteps]) =>
                    of(validityContext).pipe(
                        scan((acc, { step, ...validation }) => acc.set(step, validation), initialSteps)
                    )
                )
            )
            .subscribe(s => this.steps$.next(s));
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    setUpValidity(step: StepName, validation: { isValid: boolean; validate: ValidateFn }) {
        this.setUpValidity$.next({ step, ...validation });
    }

    validateCurrentStep() {
        this.currentStep$.pipe(take(1), pluck('validate')).subscribe(validate => validate());
    }
}
