import { Injectable } from '@angular/core';

import {
    PartyModification,
    PartyModificationType,
    ShopContractModification,
    ShopDetails,
    ShopLocation,
    ShopModification,
    ShopModificationUnit,
    ShopParams,
} from '../../../../api-codegen/claim-management';
import { PARTY_MODIFICATION } from '../consts';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;
import ShopModificationTypeEnum = ShopModification.ShopModificationTypeEnum;

@Injectable()
export class ClaimShopModificationService {
    createShopCreationModification(id: string, params: Omit<ShopParams, 'shopModificationType'>): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    shopModificationType: 'ShopParams' as any,
                    ...params,
                },
            }),
        };
    }

    createShopContractModification(
        id: string,
        params: Omit<ShopContractModification, 'shopModificationType'>
    ): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: {
                    shopModificationType: ShopModificationTypeEnum.ContractModification,
                    ...params,
                },
            }),
        };
    }

    createShopDetailsModification(id: string, params: Omit<ShopDetails, 'shopModificationType'>): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: this.makeShopDetails(params),
            }),
        };
    }

    createShopLocationModification(id: string, params: Omit<ShopLocation, 'shopModificationType'>): PartyModification {
        return {
            ...this.createBaseModification({
                id,
                modification: this.makeShopLocation(params),
            }),
        };
    }

    makeShopLocation(params: Omit<ShopLocation, 'shopModificationType'>): ShopLocation {
        return {
            shopModificationType: 'ShopLocation' as any,
            ...params,
        };
    }

    makeShopDetails(params: Omit<ShopDetails, 'shopModificationType'>): ShopDetails {
        return {
            shopModificationType: 'ShopDetails' as any,
            ...params,
        };
    }

    private createBaseModification(
        modification: Omit<ShopModificationUnit, 'partyModificationType'>
    ): PartyModification {
        return {
            ...PARTY_MODIFICATION,
            partyModificationType: {
                partyModificationType: PartyModificationTypeEnum.ShopModificationUnit,
                ...modification,
            },
        };
    }
}
