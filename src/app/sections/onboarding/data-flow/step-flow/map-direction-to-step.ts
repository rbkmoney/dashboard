import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';

import { StepName } from './step-name';

export const mapDirectionToStep = (stepFlow$: Observable<StepName[]>, activeStep$: Observable<StepName>) => (
    s: Observable<'forward' | 'back'>
): Observable<StepName> =>
    s.pipe(
        switchMap(direction => combineLatest(activeStep$, stepFlow$, of(direction)).pipe(first())),
        map(([activeStep, stepFlow, direction]) => {
            const currentPosition = stepFlow.indexOf(activeStep);
            let result;
            switch (direction) {
                case 'back':
                    result = currentPosition <= 0 ? activeStep : stepFlow[currentPosition - 1];
                    break;
                case 'forward':
                    result = currentPosition >= stepFlow.length - 1 ? activeStep : stepFlow[currentPosition + 1];
                    break;
            }
            return result;
        })
    );
