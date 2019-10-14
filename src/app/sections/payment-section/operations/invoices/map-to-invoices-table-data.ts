import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '../../../../api-codegen/anapi';
import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';
import { InvoicesTableData } from './table';

const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
const findShop = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShop(s, shopID));
const invoiceToTableData = (
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
const invoicesToTableData = (searchResult: Invoice[], s: Shop[]) => searchResult.map(r => invoiceToTableData(r, s));

export const mapToInvoicesTableData = (s: Observable<[Invoice[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => invoicesToTableData(searchResult, shops)));
