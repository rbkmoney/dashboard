import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { genXRequestID } from '../gen-x-request-id';
import { PaymentsService, Refund, RefundParams } from '../../api-codegen/capi/swagger-codegen';

@Injectable()
export class RefundService {
    constructor(private paymentsService: PaymentsService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund(genXRequestID(), invoiceID, paymentID, refundParams);
    }
}
