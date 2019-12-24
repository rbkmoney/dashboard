import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, iif, zip } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { StepFlowService, StepName } from '../step-flow';
import { mapToIsFlowValid } from './map-to-is-flow-valid';
import { mapToInitialValiditySteps } from './map-to-initial-validity-steps';
import { ValiditySteps } from './validity-steps';
import { setValidity } from './set-validity';

@Injectable()
export class ValidityService {
    private setUpValidity$: Subject<[StepName, boolean]> = new Subject();
    private validityStepsState$: BehaviorSubject<ValiditySteps | null> = new BehaviorSubject(null);
    private validitySteps$: Observable<ValiditySteps> = this.validityStepsState$.pipe(filter(s => s !== null));

    isFlowValid$: Observable<boolean> = this.validitySteps$.pipe(
        mapToIsFlowValid,
        shareReplay(1)
    );

    constructor(private stepFlowService: StepFlowService) {
        const initialSteps$ = this.stepFlowService.stepFlow$.pipe(mapToInitialValiditySteps);
        const setUpFlow$ = zip(this.validitySteps$, this.setUpValidity$).pipe(setValidity);
        this.validityStepsState$
            .pipe(switchMap(state => iif(() => state === null, initialSteps$, setUpFlow$)))
            .subscribe(s => this.validityStepsState$.next(s));
    }

    setUpValidity(stepName: StepName, isValid: boolean) {
        this.setUpValidity$.next([stepName, isValid]);
    }

    isValid(step: StepName): Observable<boolean> {
        return this.validitySteps$.pipe(map(validitySteps => validitySteps.get(step)));
    }
}
