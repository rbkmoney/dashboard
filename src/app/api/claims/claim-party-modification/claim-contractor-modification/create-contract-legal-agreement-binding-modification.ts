import {
    ContractLegalAgreementBindingModification,
    ContractModification,
    LegalAgreement,
} from '../../../../api-codegen/claim-management';
import { createBaseContractorModification } from './create-base-contractor-modification';

export const createContractLegalAgreementBindingModification = (legalAgreement: LegalAgreement) =>
    createBaseContractorModification<ContractLegalAgreementBindingModification>({
        contractModificationType:
            ContractModification.ContractModificationTypeEnum.ContractLegalAgreementBindingModification,
        legalAgreement,
    });
