import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentSearchResult, Shop } from '@dsh/api-codegen/capi';
import { getShopNameById } from '@dsh/api/shop/utils';

import { Payment } from '../../types/payment';

export const formatPaymentsData = (
    paymentsData: Observable<[PaymentSearchResult[], Shop[]]>
): Observable<Payment[]> => {
    return paymentsData.pipe(
        map(([searchResult, shops]: [PaymentSearchResult[], Shop[]]) => {
            return searchResult.map(
                ({ amount, status, statusChangedAt, invoiceID, shopID, id, currency }: PaymentSearchResult) => {
                    return {
                        amount,
                        status,
                        currency,
                        invoiceID,
                        statusChangedAt: statusChangedAt as any,
                        paymentID: id,
                        shopName: getShopNameById(shops, shopID),
                    };
                }
            );
        })
    );
};
