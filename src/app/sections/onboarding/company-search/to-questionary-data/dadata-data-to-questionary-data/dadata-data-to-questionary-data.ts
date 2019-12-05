import { PartyContent, OrgType } from '../../../../../api-codegen/aggr-proxy';
import { QuestionaryData, Contractor } from '../../../../../api-codegen/questionary';
import { toLegalEntityContractor, toIndividualEntityContractor } from './to-contractor';

const createContractor = (partyContent: PartyContent): Contractor | null => {
    switch (partyContent.orgType) {
        case OrgType.Legal:
            return toLegalEntityContractor(partyContent);
        case OrgType.Individual:
            return toIndividualEntityContractor(partyContent);
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
