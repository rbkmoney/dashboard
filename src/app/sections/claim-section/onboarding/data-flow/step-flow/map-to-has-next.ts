import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StepName } from './step-name';

export const mapToHasNext = (stepFlow$: Observable<StepName[]>) => (s: Observable<StepName>) =>
    s.pipe(
        switchMap((activeStep) => zip(stepFlow$, of(activeStep))),
        map(([stepFlow, activeStep]) => {
            const currentPosition = stepFlow.indexOf(activeStep);
            return stepFlow.length - 1 !== currentPosition;
        })
    );
