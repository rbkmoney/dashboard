import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { first, scan, shareReplay, switchMap } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { mapToInitialValiditySteps } from './map-to-initial-validity-steps';
import { mapToIsFlowValid } from './map-to-is-flow-valid';
import { ValiditySteps } from './validity-steps';

@Injectable()
export class ValidityService {
    private setUpValidity$: Subject<[StepName, boolean]> = new Subject();
    private steps$: Subject<ValiditySteps> = new ReplaySubject(1);
    private sub: Subscription = Subscription.EMPTY;

    validitySteps$: Observable<ValiditySteps> = this.steps$.asObservable();
    isFlowValid$: Observable<boolean> = this.validitySteps$.pipe(mapToIsFlowValid, shareReplay(1));

    constructor(private stepFlowService: StepFlowService) {}

    subscribe() {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(mapToInitialValiditySteps, first());
        this.sub = combineLatest([this.setUpValidity$, initialSteps$])
            .pipe(
                switchMap(([validityContext, initialSteps]) =>
                    of(validityContext).pipe(
                        scan((acc, [step, isValid]) => (acc.has(step) ? acc.set(step, isValid) : acc), initialSteps)
                    )
                )
            )
            .subscribe((s) => this.steps$.next(s));
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    setUpValidity(stepName: StepName, isValid: boolean) {
        this.setUpValidity$.next([stepName, isValid]);
    }
}
