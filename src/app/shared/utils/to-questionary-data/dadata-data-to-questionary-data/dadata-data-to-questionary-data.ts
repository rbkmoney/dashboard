import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { Contractor, QuestionaryData } from '@dsh/api-codegen/questionary';

import { createIndividualEntityContractor, isIndividualOrg } from './create-individual-entity-contractor';
import { createLegalEntityContractor, isLegalOrg } from './create-legal-entity-contractor';

export const createContractorByDadataData = (partyContent: PartyContent): Contractor | null => {
    if (isLegalOrg(partyContent)) return createLegalEntityContractor(partyContent);
    if (isIndividualOrg(partyContent)) return createIndividualEntityContractor(partyContent);
    return null;
};

export const dadataDataToQuestionaryData = (partyContent: PartyContent): QuestionaryData | null => {
    const contractor = createContractorByDadataData(partyContent);
    if (!contractor) {
        return null;
    }
};
