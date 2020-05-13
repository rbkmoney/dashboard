import { Injectable } from '@angular/core';
import { combineLatest, merge, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { first, map, pairwise, pluck, scan, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { mapToInitialValiditySteps } from './map-to-initial-validity-steps';
import { mapToIsFlowValid } from './map-to-is-flow-valid';
import { StepWithValidity, Validity, ValiditySteps } from './validity-steps';

@Injectable()
export class ValidityService {
    private setUpValidity$ = new Subject<StepWithValidity>();
    private steps$ = new ReplaySubject<ValiditySteps>(1);
    private sub: Subscription = Subscription.EMPTY;
    private activeStepValidity$ = combineLatest([this.stepFlowService.activeStep$, this.steps$]).pipe(
        map(([activeStep, validitySteps]) => validitySteps.get(activeStep)),
        shareReplay(1)
    );

    validitySteps$: Observable<ValiditySteps> = this.steps$.asObservable();
    isFlowValid$: Observable<boolean> = this.validitySteps$.pipe(mapToIsFlowValid, shareReplay(1));
    isCurrentStepValid$: Observable<boolean> = this.activeStepValidity$.pipe(pluck('isValid'), shareReplay(1));

    constructor(private stepFlowService: StepFlowService) {}

    subscribe() {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(mapToInitialValiditySteps, first());
        this.sub = merge(
            combineLatest([this.setUpValidity$, initialSteps$]).pipe(
                switchMap(([validityContext, initialSteps]) =>
                    of(validityContext).pipe(
                        scan(
                            (acc, { step, ...validity }) => (acc.has(step) ? acc.set(step, validity) : acc),
                            initialSteps
                        )
                    )
                ),
                tap(s => this.steps$.next(s))
            ),
            combineLatest([this.stepFlowService.activeStep$.pipe(pairwise(), pluck(0)), this.steps$]).pipe(
                map(([prevStep, validitySteps]) => validitySteps.get(prevStep)),
                pluck('validate'),
                tap(validate => validate())
            )
        ).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    setUpValidity(step: StepName, validity: Validity) {
        this.setUpValidity$.next({ step, ...validity });
    }

    validateCurrentStep() {
        this.activeStepValidity$.pipe(take(1), pluck('validate')).subscribe(validate => validate());
    }
}
