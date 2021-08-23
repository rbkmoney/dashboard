import { OrgType, PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { Contractor, QuestionaryData } from '@dsh/api-codegen/questionary';

import { createIndividualEntityContractor } from './create-individual-entity-contractor';
import { createLegalEntityContractor } from './create-legal-entity-contractor';

const createContractor = (partyContent: PartyContent): Contractor | null => {
    switch (partyContent.orgType) {
        case OrgType.Legal:
            return createLegalEntityContractor(partyContent);
        case OrgType.Individual:
            return createIndividualEntityContractor(partyContent);
        default:
            return null;
    }
};

export const dadataDataToQuestionaryData = (partyContent: PartyContent): QuestionaryData | null => {
    const contractor = createContractor(partyContent);
    if (!contractor) {
        return null;
    }
    return { contractor };
};
