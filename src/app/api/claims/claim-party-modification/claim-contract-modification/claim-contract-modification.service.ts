import { Injectable } from '@angular/core';

import {
    ContractModification,
    ContractModificationUnit,
    ContractParams,
    PartyModification,
    PartyModificationType,
    PayoutToolInfo,
    PayoutToolModification,
    PayoutToolParams,
} from '../../../../api-codegen/claim-management';
import { PARTY_MODIFICATION } from '../consts';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

@Injectable()
export class ClaimContractModificationService {
    createContractorParamsModification(
        id: string,
        params: Omit<ContractParams, 'contractModificationType'>
    ): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    contractModificationType: ContractModification.ContractModificationTypeEnum.ContractParams,
                    ...params,
                },
            }),
        };
    }

    createRussianContractPayoutToolModification(
        id: string,
        params: Omit<PayoutToolInfo, 'payoutToolType' | 'payoutToolModificationType'>
    ): PartyModification {
        return this.createContractPayoutToolModification(id, {
            currency: {
                symbolicCode: 'RUB',
            },
            toolInfo: {
                payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
                payoutToolModificationType: 'Creation',
                ...params,
            },
        });
    }

    createContractPayoutToolModification(
        id: string,
        params: Omit<PayoutToolParams, 'payoutToolModificationType'>
    ): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    contractModificationType:
                        ContractModification.ContractModificationTypeEnum.PayoutToolModificationUnit,
                    modification: {
                        payoutToolModificationType: PayoutToolModification.PayoutToolModificationTypeEnum.Creation,
                        ...params,
                    } as PayoutToolParams,
                } as ContractModification,
            }),
        };
    }

    private createBaseModification(
        modification: Omit<ContractModificationUnit, 'partyModificationType'>
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
