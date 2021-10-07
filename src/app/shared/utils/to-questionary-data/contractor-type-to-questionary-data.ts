import { Contractor, QuestionaryData, LegalEntity, IndividualEntity } from '@dsh/api-codegen/questionary';

import ContractorTypeEnum = Contractor.ContractorTypeEnum;
import LegalEntityTypeEnum = LegalEntity.LegalEntityTypeEnum;
import IndividualEntityTypeEnum = IndividualEntity.IndividualEntityTypeEnum;

export const contractorTypeToQuestionaryData = (
    contractorType: ContractorTypeEnum,
    entityType: LegalEntityTypeEnum | IndividualEntityTypeEnum
): QuestionaryData => ({
    contractor: {
        contractorType,
        ...(contractorType === ContractorTypeEnum.LegalEntityContractor
            ? {
                  legalEntity: {
                      legalEntityType: entityType,
                  },
              }
            : {
                  individualEntity: {
                      individualEntityType: entityType,
                  },
              }),
    },
});
