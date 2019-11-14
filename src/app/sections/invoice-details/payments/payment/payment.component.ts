import { Component, Input, Inject, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';
import { StatusColor as Color } from '../../../../theme-manager';
import { PaymentStatus } from '../../../../api-codegen/anapi/swagger-codegen';
import { getPaymentStatusInfo } from '../../../get-payment-status-info';

@Component({
    selector: 'dsh-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss']
})
export class PaymentComponent implements OnChanges {
    color: Color;
    status: string;

    @Input()
    payment: PaymentSearchResult;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private router: Router) {}

    ngOnChanges({ payment }: SimpleChanges) {
        this.setInfo(payment.currentValue.status);
    }

    setInfo(paymentStatus: PaymentStatus.StatusEnum) {
        const { color, status } = getPaymentStatusInfo(paymentStatus);
        this.color = color;
        this.status = status;
    }

    goToPaymentDetails() {
        this.router.navigate(['invoice', this.payment.invoiceID, 'payment', this.payment.id]);
    }
}
