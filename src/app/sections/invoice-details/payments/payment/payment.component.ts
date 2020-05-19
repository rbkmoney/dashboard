import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentStatus } from '../../../../api-codegen/anapi/swagger-codegen';
import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor as Color } from '../../../../theme-manager';
import { LAYOUT_GAP } from '../../../constants';
import { getPaymentStatusInfo } from '../../../get-payment-status-info';

@Component({
    selector: 'dsh-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss'],
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
