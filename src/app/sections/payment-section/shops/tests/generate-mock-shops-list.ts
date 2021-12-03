import isNil from 'lodash-es/isNil';

import { Shop } from '@dsh/api-codegen/capi/swagger-codegen';

import { generateMockShop } from './generate-mock-shop';
import { makeEmptyList } from './make-empty-list';

export function generateMockShopsList(
    length: number,
    defaultCategoryID: number = 1,
    specificCategoryIndexes: { index: number; categoryID: number }[] = []
): Shop[] {
    const shops = makeEmptyList(length).map((_: null, index: number) => {
        const order = index + 1;
        return generateMockShop(order, defaultCategoryID);
    });

    specificCategoryIndexes.forEach(({ index, categoryID: id }: { index: number; categoryID: number }) => {
        const mockShop = shops[index];

        if (isNil(mockShop)) {
            throw new Error('specificCategoryIndexes list could contains only existing indexes');
        }

        mockShop.categoryID = id;
    });

    return shops;
}
