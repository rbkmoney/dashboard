import { generateMockBalance } from '../../tests/generate-mock-balance';
import { generateMockShop } from '../../tests/generate-mock-shop';
import { generateMockShopsList } from '../../tests/generate-mock-shops-list';
import { combineShopItem } from './combine-shop-item';

describe('combineShopItem', () => {
    it('should combine shops elements and balance elements', () => {
        const shopsList = generateMockShopsList(5);
        const balancesList = [
            generateMockBalance(1, 15),
            generateMockBalance(2, 20),
            generateMockBalance(3, 200),
            generateMockBalance(4, 500),
            generateMockBalance(5, 23),
        ];

        expect(combineShopItem(shopsList, balancesList)).toEqual([
            {
                ...generateMockShop(1),
                balance: {
                    amount: 15,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(2),
                balance: {
                    amount: 20,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(3),
                balance: {
                    amount: 200,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(4),
                balance: {
                    amount: 500,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(5),
                balance: {
                    amount: 23,
                    currency: 'USD',
                },
            },
        ]);
    });

    it('should use null if shop has not its own balance data', () => {
        const shopsList = generateMockShopsList(5);
        const balancesList = [generateMockBalance(1, 15), generateMockBalance(2, 20), generateMockBalance(5, 23)];

        expect(combineShopItem(shopsList, balancesList)).toEqual([
            {
                ...generateMockShop(1),
                balance: {
                    amount: 15,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(2),
                balance: {
                    amount: 20,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(3),
                balance: null,
            },
            {
                ...generateMockShop(4),
                balance: null,
            },
            {
                ...generateMockShop(5),
                balance: {
                    amount: 23,
                    currency: 'USD',
                },
            },
        ]);
    });

    it('should return empty list if shops list is empty', () => {
        const shopsList = [];
        const balancesList = [
            generateMockBalance(1, 15),
            generateMockBalance(2, 20),
            generateMockBalance(3, 200),
            generateMockBalance(4, 500),
            generateMockBalance(5, 23),
        ];

        expect(combineShopItem(shopsList, balancesList)).toEqual([]);
    });

    it('should format all shops balances property as null if balances list is empty', () => {
        const shopsList = generateMockShopsList(5);
        const balancesList = [];

        expect(combineShopItem(shopsList, balancesList)).toEqual([
            {
                ...generateMockShop(1),
                balance: null,
            },
            {
                ...generateMockShop(2),
                balance: null,
            },
            {
                ...generateMockShop(3),
                balance: null,
            },
            {
                ...generateMockShop(4),
                balance: null,
            },
            {
                ...generateMockShop(5),
                balance: null,
            },
        ]);
    });

    it('should format shop balance as null if its own balance has nullable data', () => {
        const shopsList = generateMockShopsList(5);
        const balancesList = [
            generateMockBalance(1, 15),
            generateMockBalance(2, 20),
            generateMockBalance(3),
            generateMockBalance(4),
            generateMockBalance(5, 23),
        ];

        expect(combineShopItem(shopsList, balancesList)).toEqual([
            {
                ...generateMockShop(1),
                balance: {
                    amount: 15,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(2),
                balance: {
                    amount: 20,
                    currency: 'USD',
                },
            },
            {
                ...generateMockShop(3),
                balance: null,
            },
            {
                ...generateMockShop(4),
                balance: null,
            },
            {
                ...generateMockShop(5),
                balance: {
                    amount: 23,
                    currency: 'USD',
                },
            },
        ]);
    });
});
