import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RefundSearchResult, Shop } from '../../../../api-codegen/anapi';
import { toShopName } from '../../../../api/shop/utils';
import { RefundsTableData } from './table';

const toRefundTableData = (
    { amount, status, invoiceID, shopID, paymentID, currency, createdAt }: RefundSearchResult,
    s: Shop[]
): RefundsTableData | null => ({
    amount,
    status,
    currency,
    invoiceID,
    paymentID,
    createdAt: createdAt as any,
    shopName: toShopName(s, shopID),
});

const refundsToTableData = (searchResult: RefundSearchResult[], s: Shop[]) =>
    searchResult.map((r) => toRefundTableData(r, s));

export const mapToRefundsTableData = (s: Observable<[RefundSearchResult[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => refundsToTableData(searchResult, shops)));
