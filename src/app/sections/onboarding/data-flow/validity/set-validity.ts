import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepName } from '../step-flow';
import { ValiditySteps } from './validity-steps';

export const setValidity = (s: Observable<[ValiditySteps, [StepName, boolean]]>): Observable<ValiditySteps> =>
    s.pipe(
        map(([validitySteps, [step, isValid]]) =>
            validitySteps.has(step) ? validitySteps.set(step, isValid) : validitySteps
        )
    );
