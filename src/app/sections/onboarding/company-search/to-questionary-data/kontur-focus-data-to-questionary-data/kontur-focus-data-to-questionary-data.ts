import { ReqResponse } from '../../../../../api-codegen/aggr-proxy';
import { QuestionaryData } from '../../../../../api-codegen/questionary';
import { createLegalEntityContractor } from './create-legal-entity-contractor';
import { createIndividualEntityContractor } from './create-individual-entity-contractor';

function createContractor(company: ReqResponse) {
    const { contractor } = company;
    switch (contractor.reqContractorType) {
        case 'ReqLegalEntity':
            return createLegalEntityContractor(company);
        case 'ReqIndividualEntity':
            return createIndividualEntityContractor(company);
        default:
            return null;
    }
}

export const konturFocusDataToQuestionaryData = (company: ReqResponse): QuestionaryData | null => {
    const contractor = createContractor(company);
    if (!contractor) {
        return null;
    }
    return { contractor };
};
