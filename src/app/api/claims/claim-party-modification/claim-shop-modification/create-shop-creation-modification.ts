import { PartyModification, ShopParams } from '../../../../api-codegen/claim-management';

export function createShopCreationModification(
    id: string,
    params: Omit<ShopParams, 'shopModificationType'>
): PartyModification {
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
