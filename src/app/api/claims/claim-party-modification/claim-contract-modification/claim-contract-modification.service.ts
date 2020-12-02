import { Injectable } from '@angular/core';

import {
    ContractModification,
    ContractModificationUnit,
    ContractParams,
    PartyModification,
    PartyModificationType,
} from '../../../../api-codegen/claim-management';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;
import { PayoutToolInfo, PayoutToolParams } from '../../../../api-codegen/dark-api';
import { PARTY_MODIFICATION } from '../consts';

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
        payouToolID: string,
        params: Omit<PayoutToolInfo, 'payoutToolType' | 'payoutToolModificationType'>
    ): PartyModification {
        return this.createContractPayoutToolModification(id, payouToolID, {
            currency: {
                symbolicCode: 'RUB',
            },
            toolInfo: {
                payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
                ...params,
            },
        });
    }

    createContractPayoutToolModification(
        id: string,
        payoutToolID: string,
        params: Omit<PayoutToolParams, 'payoutToolModificationType'>
    ): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    contractModificationType:
                        ContractModification.ContractModificationTypeEnum.PayoutToolModificationUnit,
                    payoutToolID,
                    modification: {
                        payoutToolModificationType: 'PayoutToolParams', // api generates wrong enum
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
