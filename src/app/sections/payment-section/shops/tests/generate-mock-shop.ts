import { Shop as ApiShop } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockShopId } from './generate-mock-shop-id';

export function generateMockShop(order: number, categoryID: number = 1): ApiShop {
    return {
        id: generateMockShopId(order),
        createdAt: new Date(),
        isBlocked: false,
        isSuspended: false,
        categoryID,
        location: {
            locationType: 'type',
        },
        details: {
            name: 'my name',
            description: 'some description',
        },
        contractID: 'contractID',
        payoutToolID: 'payoutToolID',
        scheduleID: 1,
        account: {
            currency: 'USD',
            guaranteeID: 2,
            settlementID: 2,
        },
    };
}
