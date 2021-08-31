import { Overwrite } from 'utility-types';

import {
    Contractor,
    InternationalLegalEntity,
    LegalEntity,
    LegalEntityContractor,
} from '@dsh/api-codegen/questionary/swagger-codegen';

type InternationalLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    {
        legalEntity: Overwrite<LegalEntity, InternationalLegalEntity>;
    }
>;

export const isInternationalLegalEntityContractor = (
    contractor: LegalEntityContractor
): contractor is InternationalLegalEntityContractor =>
    contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntityContractor &&
    contractor.legalEntity.legalEntityType === LegalEntity.LegalEntityTypeEnum.InternationalLegalEntity;
