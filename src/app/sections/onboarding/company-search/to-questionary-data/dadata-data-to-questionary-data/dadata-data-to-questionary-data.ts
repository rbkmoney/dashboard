import { PartyContent, OrgType } from '../../../../../api-codegen/aggr-proxy';
import { QuestionaryData, Contractor } from '../../../../../api-codegen/questionary';
import { createLegalEntityContractor } from './create-legal-entity-contractor';
import { createIndividualEntityContractor } from './create-individual-entity-contractor';

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
