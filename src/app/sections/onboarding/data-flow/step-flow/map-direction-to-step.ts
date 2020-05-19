import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StepName } from './step-name';

export const mapDirectionToStep = (stepFlow$: Observable<StepName[]>, activeStep$: Observable<StepName>) => (
    s: Observable<'forward' | 'back'>
): Observable<StepName> =>
    s.pipe(
        switchMap((direction) => zip(activeStep$, stepFlow$, of(direction))),
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
