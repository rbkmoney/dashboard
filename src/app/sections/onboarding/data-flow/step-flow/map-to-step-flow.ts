import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import get from 'lodash.get';

import { Questionary, Contractor } from '../../../../api-codegen/questionary';
import { LegalEntityStepFlow, IndividualEntityStepFlow } from './step-flows';
import { StepName } from './step-name';

export const mapToStepFlow = (s: Observable<Questionary>): Observable<StepName[] | null> =>
    s.pipe(
        map(q => {
            const contractorType = get(q, ['data', 'contractor', 'contractorType']);
            const t = Contractor.ContractorTypeEnum;
            switch (contractorType) {
                case t.LegalEntityContractor:
                    return LegalEntityStepFlow;
                case t.IndividualEntityContractor:
                    return IndividualEntityStepFlow;
            }
            return null;
        })
    );
