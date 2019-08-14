import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentsService, Refund, RefundParams } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';

@Injectable()
export class RefundService {

    constructor(private paymentsService: PaymentsService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund(
            genXRequestID(),
            invoiceID,
            paymentID,
            refundParams
        );
    }
}
