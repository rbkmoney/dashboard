import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentSearchResult, Shop } from '@dsh/api-codegen/capi';
import { getShopNameById } from '@dsh/api/shop/utils';

import { Payment } from '../../types/payment';

// TODO: remove after swag interfaces update
type ApiPayment = PaymentSearchResult & { externalID: string };

export const formatPaymentsData = (paymentsData: Observable<[ApiPayment[], Shop[]]>): Observable<Payment[]> => {
    return paymentsData.pipe(
        map(([searchResult, shops]: [ApiPayment[], Shop[]]) => {
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
                    transactionInfo,
                    error,
                    externalID,
                }: ApiPayment) => {
                    return {
                        amount,
                        status,
                        currency,
                        invoiceID,
                        statusChangedAt: statusChangedAt as any,
                        paymentID: id,
                        fee,
                        externalID,
                        error,
                        transactionInfo,
                        payer: payer as Payment['payer'],
                        shopName: getShopNameById(shops, shopID),
                    };
                }
            );
        })
    );
};
