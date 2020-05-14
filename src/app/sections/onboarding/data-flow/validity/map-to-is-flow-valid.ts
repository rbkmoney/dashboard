import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ValiditySteps } from './validity-steps';

export const mapToIsFlowValid = (s: Observable<ValiditySteps>): Observable<boolean> =>
    s.pipe(map(validitySteps => Array.from(validitySteps.values()).every(isValid => isValid)));
