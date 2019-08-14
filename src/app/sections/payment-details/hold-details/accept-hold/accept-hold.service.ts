import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentService } from '../../../../payment';
import { CaptureParams } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class AcceptHoldService {
    constructor(private paymentService: PaymentService) {}

    capturePayment(invoiceID: string, paymentID: string, params: CaptureParams): Observable<any> {
        return this.paymentService.capturePayment(invoiceID, paymentID, params);
    }
}
