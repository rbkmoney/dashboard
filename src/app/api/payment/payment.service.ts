import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CaptureParams, PaymentsService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class PaymentService {
    constructor(private paymentsService: PaymentsService) {}

    cancelPayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.paymentsService.cancelPayment(genXRequestID(), invoiceID, paymentID, { reason });
    }

    capturePayment(invoiceID: string, paymentID: string, params: CaptureParams): Observable<void> {
        return this.paymentsService.capturePayment(genXRequestID(), invoiceID, paymentID, params);
    }
}
