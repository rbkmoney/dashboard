import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CaptureParams, Payment, PaymentsService } from '@dsh/api-codegen/capi/swagger-codegen';

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

    getPaymentByID(invoiceID: string, paymentID: string): Observable<Payment> {
        return this.paymentsService.getPaymentByID(genXRequestID(), invoiceID, paymentID);
    }

    getPayments(invoiceID: string): Observable<Payment[]> {
        return this.paymentsService.getPayments(genXRequestID(), invoiceID);
    }
}
