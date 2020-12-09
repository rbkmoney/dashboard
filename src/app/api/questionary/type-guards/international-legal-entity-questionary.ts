import {
    Contractor,
    InternationalLegalEntity,
    LegalEntity,
    LegalEntityContractor,
} from '@dsh/api-codegen/questionary/swagger-codegen';

import { Replace } from '../../../../type-utils';

type InternationalLegalEntityContractor = Replace<
    LegalEntityContractor,
    {
        legalEntity: Replace<LegalEntity, InternationalLegalEntity>;
    }
>;

export const isInternationalLegalEntityContractor = (
    contractor: LegalEntityContractor
): contractor is InternationalLegalEntityContractor =>
    contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntityContractor &&
    contractor.legalEntity.legalEntityType === LegalEntity.LegalEntityTypeEnum.InternationalLegalEntity;
