import { ShopInfo } from '../operators';

export const filterByNameAndId = (filter: string, shops: ShopInfo[]) =>
    shops.filter(shop => (filter ? (shop.name + shop.shopID).toLowerCase().includes(filter) : true));
