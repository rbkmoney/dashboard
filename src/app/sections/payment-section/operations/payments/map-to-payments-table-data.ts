import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop, PaymentSearchResult } from '../../../../api-codegen/capi';
import { PaymentsTableData } from './table';
import { toShopName } from '../../../../api/shop/utils';

const toPaymentTableData = (
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

const paymentsToTableData = (searchResult: PaymentSearchResult[], s: Shop[]) => searchResult.map(r => toPaymentTableData(r, s));

export const mapToPaymentsTableData = (s: Observable<[PaymentSearchResult[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => paymentsToTableData(searchResult, shops)));