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
                ({
                    amount,
                    status,
                    statusChangedAt,
                    invoiceID,
                    shopID,
                    id,
                    currency,
                    fee = 0,
                    payer,
                    error,
                }: PaymentSearchResult) => {
                    return {
                        amount,
                        status,
                        currency,
                        invoiceID,
                        statusChangedAt: statusChangedAt as any,
                        paymentID: id,
                        fee,
                        error,
                        payer: payer as Payment['payer'],
                        shopName: getShopNameById(shops, shopID),
                    };
                }
            );
        })
    );
};
