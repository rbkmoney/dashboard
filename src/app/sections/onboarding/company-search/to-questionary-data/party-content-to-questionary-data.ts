import { PartyContent, OrgType } from '../../../../api-codegen/aggr-proxy';
import { QuestionaryData, Contractor } from '../../../../api-codegen/questionary';
import { toContractor } from './to-contractor';

const toContractorType = (orgType: OrgType): Contractor.ContractorTypeEnum | null => {
    if (!orgType) {
        return null;
    }
    const e = Contractor.ContractorTypeEnum;
    switch (orgType) {
        case OrgType.Legal:
            return e.LegalEntityContractor;
        case OrgType.Individual:
            return e.IndividualEntityContractor;
        default:
            return null;
    }
};

export const partyContentToQuestionaryData = ({ orgType, inn }: PartyContent): QuestionaryData | null => {
    const contractorType = toContractorType(orgType);
    if (!contractorType) {
        return null;
    }
    return { contractor: toContractor(contractorType, inn) };
};
