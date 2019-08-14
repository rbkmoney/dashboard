import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CaptureParams, PaymentsService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api';

@Injectable()
export class PaymentService {
    constructor(private paymentsService: PaymentsService) {}

    cancelPayment(invoiceID: string, paymentID: string, reason: string): Observable<any> {
        return this.paymentsService.cancelPayment(genXRequestID(), invoiceID, paymentID, { reason });
    }

    capturePayment(invoiceID: string, paymentID: string, params: CaptureParams): Observable<any> {
        return this.paymentsService.capturePayment(genXRequestID(), invoiceID, paymentID, params);
    }
}
