import { Injectable } from '@angular/core';

import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import {
    ContractorModification,
    ContractorType,
    LegalEntityType,
    PartyModification,
    PartyModificationType,
    RussianLegalEntity,
} from '../../../../api-codegen/claim-management';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

@Injectable()
export class ClaimContractorModificationService {
    createRussianLegalEntityModification(
        id: string,
        params: Omit<RussianLegalEntity, 'legalEntityType'>
    ): PartyModification {
        return this.createContractorLegalEntityModification(id, {
            legalEntityType: LegalEntityType.LegalEntityTypeEnum.RussianLegalEntity,
            ...params,
        });
    }

    private createContractorLegalEntityModification(id: string, entity: LegalEntityType): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    contractorModificationType: ContractorModification.ContractorModificationTypeEnum.Contractor,
                    contractorType: {
                        contractorType: ContractorType.ContractorTypeEnum.LegalEntity,
                        legalEntityType: {
                            ...entity,
                        },
                    } as ContractorType,
                } as ContractorModification,
            }),
        };
    }

    private createBaseModification(
        modification: Omit<ContractorModification, 'contractorModificationType'>
    ): PartyModification {
        return {
            ...PARTY_MODIFICATION,
            partyModificationType: {
                partyModificationType: PartyModificationTypeEnum.ContractModificationUnit,
                ...modification,
            },
        };
    }
}
