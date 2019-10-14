import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import get from 'lodash.get';

import { Questionary } from '../../../../api-codegen/questionary';
import { LegalEntityStepFlow, IndividualEntityStepFlow } from './step-flows';
import { Contractor } from '../../../../api-codegen/claim-management';
import { StepName } from './step-name';

export const mapToStepFlow = (s: Observable<Questionary>): Observable<StepName[] | null> =>
    s.pipe(
        map(q => {
            const contractorType = get(q, ['data', 'contractor', 'contractorType']);
            const t = Contractor.ContractorTypeEnum;
            switch (contractorType) {
                case t.LegalEntity:
                    return LegalEntityStepFlow;
                case t.PrivateEntity:
                    return IndividualEntityStepFlow;
            }
            return null;
        })
    );
