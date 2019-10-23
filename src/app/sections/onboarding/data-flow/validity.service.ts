import { Injectable } from '@angular/core';
import { Observable, of, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, first, filter } from 'rxjs/operators';

import { StepFlowService, StepName } from './step-flow';

@Injectable()
export class ValidityService {
    private setUpValidity$: Subject<boolean> = new Subject();
    private validityFlow$: Subject<Map<StepName, boolean>> = new BehaviorSubject(null);

    isFlowValid$: Observable<boolean> = of(false);

    constructor(private stepFlowService: StepFlowService) {
        combineLatest(
            this.setUpValidity$,
            this.stepFlowService.activeStep$,
            this.validityFlow$.pipe(
                filter(f => !!f),
                first()
            )
        ).subscribe();
    }

    setUpValidity(isValid: boolean) {
        this.setUpValidity$.next(isValid);
    }

    isValid(step: StepName): Observable<boolean> {
        return of(false).pipe(
            tap(_ => console.log(step)),
            first(),
            shareReplay(1)
        );
    }
}
