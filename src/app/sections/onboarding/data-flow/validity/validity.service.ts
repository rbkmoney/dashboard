import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest, BehaviorSubject, merge } from 'rxjs';
import { first, filter, map, shareReplay } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { mapToIsFlowValid } from './map-to-is-flow-valid';
import { mapToInitialValiditySteps } from './map-to-initial-validity-steps';
import { ValiditySteps } from './validity-steps';
import { setValidity } from './set-validity';

@Injectable()
export class ValidityService {
    private setUpValidity$: Subject<[StepName, boolean]> = new Subject();
    private validityStepsState$: Subject<ValiditySteps | null> = new BehaviorSubject(null);
    private validitySteps$: Observable<ValiditySteps> = this.validityStepsState$.pipe(filter(s => s !== null));

    isFlowValid$: Observable<boolean> = this.validitySteps$.pipe(
        mapToIsFlowValid,
        shareReplay(1)
    );

    constructor(private stepFlowService: StepFlowService) {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(
            first(),
            mapToInitialValiditySteps
        );
        const setUpFlow$ = combineLatest(this.validitySteps$.pipe(first()), this.setUpValidity$).pipe(setValidity);
        merge(initialSteps$, setUpFlow$).subscribe(s => this.validityStepsState$.next(s));
    }

    setUpValidity(stepName: StepName, isValid: boolean) {
        this.setUpValidity$.next([stepName, isValid]);
    }

    isValid(step: StepName): Observable<boolean> {
        return this.validityStepsState$.pipe(
            map(validitySteps => validitySteps.get(step)),
            shareReplay(1)
        );
    }
}
