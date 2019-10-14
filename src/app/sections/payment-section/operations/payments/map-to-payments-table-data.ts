import { Shop, PaymentSearchResult } from '../../../../api-codegen/capi';
import { PaymentsTableData } from './table';
import { toShopName } from '../to-shop-name';

export const paymentToTableData = (
    { amount, status, statusChangedAt, invoiceID, shopID, id, currency }: PaymentSearchResult,
    s: Shop[]
): PaymentsTableData | null => ({
    amount,
    status,
    currency,
    invoiceID,
    statusChangedAt: statusChangedAt as any,
    paymentID: id,
    shopName: toShopName(s, shopID)
});
