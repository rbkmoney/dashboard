import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop, PaymentSearchResult } from '../../../../api-codegen/capi';
import { PaymentsTableData } from './table';

const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
const findShop = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShop(s, shopID));
const paymentToTableData = (
    { amount, status, statusChangedAt, invoiceID, shopID, id, currency }: PaymentSearchResult,
    s: Shop[]
): PaymentsTableData | null => ({
    amount,
    status,
    statusChangedAt: statusChangedAt as any,
    currency,
    invoiceID,
    paymentID: id,
    shopName: toShopName(s, shopID)
});
const paymentsToTableData = (searchResult: PaymentSearchResult[], s: Shop[]) =>
    searchResult.map(r => paymentToTableData(r, s));

export const mapToPaymentsTableData = (s: Observable<[PaymentSearchResult[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => paymentsToTableData(searchResult, shops)));
