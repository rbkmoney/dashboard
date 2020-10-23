import { Shop } from '../../../../api-codegen/capi';

export const shopsToCurrencies = (shops: Shop[]): string[] => [
    ...new Set(shops.map((shop) => shop.account.currency).filter((c) => !!c)),
];
