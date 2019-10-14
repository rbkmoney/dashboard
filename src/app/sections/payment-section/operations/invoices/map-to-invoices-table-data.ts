import { Shop, Invoice } from '../../../../api-codegen/anapi';
import { InvoicesTableData } from './table';
import { toShopName } from '../to-shop-name';

export const invoiceToTableData = (
    { amount, status, createdAt, shopID, id, currency }: Invoice,
    s: Shop[]
): InvoicesTableData | null => ({
    amount,
    currency,
    status,
    createdAt: createdAt as any,
    invoiceID: id,
    shopName: toShopName(s, shopID)
});
