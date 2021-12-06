import { generateMockBalance } from './generate-mock-balance';
import { generateMockShop } from './generate-mock-shop';

export function generateMockShopItem(order: number, amount: number | null = null, currency: string = 'USD') {
    const { data: balance } = generateMockBalance(order, amount, currency);
    const shop = generateMockShop(order);
    return {
        ...shop,
        balance,
    };
}
