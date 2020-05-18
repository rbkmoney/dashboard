import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ValiditySteps } from './validity-steps';

export const mapToIsFlowValid = (s: Observable<ValiditySteps>): Observable<boolean> =>
    s.pipe(
        map((validitySteps) => {
            for (const isValid of validitySteps.values()) {
                if (!isValid) {
                    return false;
                }
            }
            return true;
        })
    );
