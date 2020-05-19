import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepName } from '../step-flow';
import { ValiditySteps } from './validity-steps';

export const mapToInitialValiditySteps = (s: Observable<StepName[]>): Observable<ValiditySteps> =>
    s.pipe(map(stepFlow => new Map(stepFlow.map(stepName => [stepName, false]))));
