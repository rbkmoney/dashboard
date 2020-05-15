import { ShopInfo } from '../../../app/sections/payment-section/operations/operators';

export const filterByNameAndId = (filter: string, shops: ShopInfo[]) =>
    shops.filter(shop => (filter ? (shop.name + shop.shopID).toLowerCase().includes(filter) : true));
