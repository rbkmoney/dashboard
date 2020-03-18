import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Invoice, Shop } from '../../../../api-codegen/anapi';
import { toShopName } from '../../../../api/shop/utils';
import { InvoicesTableData } from './table';

const toInvoiceTableData = (
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

const invoicesToTableData = (searchResult: Invoice[], s: Shop[]) => searchResult.map(r => toInvoiceTableData(r, s));

export const mapToInvoicesTableData = (s: Observable<[Invoice[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => invoicesToTableData(searchResult, shops)));
