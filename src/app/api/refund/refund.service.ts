import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentsService, Refund, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';

import { genXRequestID } from '../utils';

@Injectable()
export class RefundService {
    constructor(private paymentsService: PaymentsService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund(genXRequestID(), invoiceID, paymentID, refundParams);
    }
}
