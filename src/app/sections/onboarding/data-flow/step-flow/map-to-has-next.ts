import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';

import { StepName } from './step-name';

export const mapToHasNext = (stepFlow$: Observable<StepName[]>) => (s: Observable<StepName>) =>
    s.pipe(
        switchMap(activeStep => combineLatest(stepFlow$, of(activeStep)).pipe(first())),
        map(([stepFlow, activeStep]) => {
            const currentPosition = stepFlow.indexOf(activeStep);
            return stepFlow.length - 1 !== currentPosition;
        })
    );
