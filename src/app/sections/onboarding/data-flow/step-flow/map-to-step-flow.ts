import get from 'lodash-es/get';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contractor, QuestionaryData } from '@dsh/api-codegen/questionary';

import { INDIVIDUAL_ENTITY_STEP_FLOW, LEGAL_ENTITY_STEP_FLOW } from './step-flows';
import { StepName } from './step-name';

export const mapToStepFlow = (s: Observable<QuestionaryData>): Observable<StepName[] | null> =>
    s.pipe(
        map((q) => {
            const contractorType = get(q, ['contractor', 'contractorType']);
            const t = Contractor.ContractorTypeEnum;
            switch (contractorType) {
                case t.LegalEntityContractor:
                    return LEGAL_ENTITY_STEP_FLOW;
                case t.IndividualEntityContractor:
                    return INDIVIDUAL_ENTITY_STEP_FLOW;
            }
            return null;
        })
    );
