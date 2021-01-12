import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Refund, RefundParams } from '@dsh/api-codegen/capi';
import { RefundService } from '@dsh/api/refund';

@Injectable()
export class RefundsService {
    constructor(private refundService: RefundService) {}

    createRefund(invoiceID: string, paymentID: string, params?: RefundParams): Observable<Refund> {
        return this.refundService.createRefund(invoiceID, paymentID, params);
    }

    getRefundedAmountSum(invoiceID: string, paymentID: string): Observable<number> {
        return this.refundService.getRefunds(invoiceID, paymentID).pipe(
            map((refunds: Refund[]) => {
                return refunds.reduce((sumAmount: number, refund: Refund) => {
                    return sumAmount + refund.amount;
                }, 0);
            })
        );
    }
}
