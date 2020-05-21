import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepName } from '../step-flow';
import { ValiditySteps } from '../validity/validity-steps';

export interface StepNavInfo {
    step: StepName;
    iconVisible: boolean;
    navStatus: 'success' | null;
    navItemSelected: boolean;
}

export const toStepNavInfo = (s: Observable<[ValiditySteps, StepName]>): Observable<StepNavInfo[]> =>
    s.pipe(
        map(([validitySteps, activeStep]) =>
            Array.from(validitySteps).map(([step, isValid]) => ({
                step,
                iconVisible: isValid,
                navStatus: isValid ? 'success' : null,
                navItemSelected: step === activeStep,
            }))
        )
    );
