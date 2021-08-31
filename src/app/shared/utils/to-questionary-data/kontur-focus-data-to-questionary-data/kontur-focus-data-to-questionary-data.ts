import { ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import { QuestionaryData, LegalEntityContractor } from '@dsh/api-codegen/questionary';

import { createIndividualEntityContractor, isReqIndividualEntity } from './create-individual-entity-contractor';
import { createLegalEntityContractor, isReqLegalEntity } from './create-legal-entity-contractor';

export function createContractorByKonturFocusData(company: ReqResponse): LegalEntityContractor {
    const { contractor } = company;
    if (isReqLegalEntity(contractor)) return createLegalEntityContractor(company);
    if (isReqIndividualEntity(contractor)) return createIndividualEntityContractor(company);
    return null;
}

export const konturFocusDataToQuestionaryData = (company: ReqResponse): QuestionaryData | null => {
    const contractor = createContractorByKonturFocusData(company);
    if (!contractor) {
        return null;
    }
    return { contractor };
};
